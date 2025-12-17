import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Truck } from '../../../core/models/truck.model';
import { TruckService } from '../../../core/api/truck.service';
import { RouteService } from '../../../core/api/route.service';
import { sharedImports } from '../../../shared/shared-imports';

@Component({
  selector: 'app-assign-truck',
  imports: [sharedImports],
  templateUrl: './assign-truck.component.html',
  styleUrl: './assign-truck.component.scss'
})
export class AssignTruckComponent {
  private truckService = inject(TruckService);
  private routeService = inject(RouteService);

  @Input() routeId!: string;
  @Output() truckAssigned = new EventEmitter<void>();

  availableTrucks: Truck[] = [];
  selectedTruckId: string = '';
  assigning = false;
  error: string = '';
  success: string = '';

  ngOnInit() {
    this.truckService.getAll().subscribe(trucks => {
      this.availableTrucks = trucks.filter(t => t.status === 'Available');
      if (this.availableTrucks.length > 0) {
        this.selectedTruckId = this.availableTrucks[0].id;
      }
    });
  }

  assignTruck() {
    if (!this.selectedTruckId) return;
    this.assigning = true;
    this.error = '';
    this.success = '';
    this.routeService.assignTruck(this.routeId, this.selectedTruckId).subscribe({
      next: () => {
        this.success = "Truck assigned!";
        this.truckAssigned.emit();
        this.assigning = false;
      },
      error: (err) => {
        this.error = (err.error && err.error.message) || "Could not assign truck.";
        this.assigning = false;
      }
    });
  }
}
