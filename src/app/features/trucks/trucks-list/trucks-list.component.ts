import { Component, inject, OnInit } from '@angular/core';
import { TruckService } from '../../../core/api/truck.service';
import { Truck } from '../../../core/models/truck.model';
import { sharedImports } from '../../../shared/shared-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trucks-list',
  imports: [sharedImports],
  templateUrl: './trucks-list.component.html',
  styleUrl: './trucks-list.component.scss'
})
export class TrucksListComponent implements OnInit {
  private router = inject(Router);
  private truckService = inject(TruckService);

  trucks: Truck[] = [];
  loading = true;

  ngOnInit() {
    this.truckService.getAll().subscribe({
      next: trucks => {
        this.trucks = trucks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to fetch trucks');
      }
    });
  }

  redirectToCreateTruck() {
    this.router.navigate(['/trucks/create']);
  }
}
