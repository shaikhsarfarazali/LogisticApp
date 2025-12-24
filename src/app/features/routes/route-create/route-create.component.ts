import { Component, inject, OnInit } from '@angular/core';
import { Load } from '../../../core/models/load.model';
import { Router } from '@angular/router';
import { LoadService } from '../../../core/api/load.service';
import { RouteService } from '../../../core/api/route.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { sharedImports } from '../../../shared/shared-imports';
import { TruckService } from '../../../core/api/truck.service';
import { Truck } from '../../../core/models/truck.model';

@Component({
  selector: 'app-route-create',
  imports: [sharedImports],
  templateUrl: './route-create.component.html',
  styleUrl: './route-create.component.scss'
})
export class RouteCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loadService = inject(LoadService);
  private truckService = inject(TruckService);
  private routeService = inject(RouteService);
  private router = inject(Router);


  loading = false; error: string | null = null;
  loads: Load[] = [];
  availableTrucks: Truck[] = [];

  selectedLoadIds: string[] = [];

  dropdownOpen: boolean = false;
  loadSearch: string = '';

  // Create a custom validator for at least one load selected
  atLeastOneLoad(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string[];
    return value && value.length > 0 ? null : { atLeastOne: true };
  }

  form = this.fb.group({
    routeNumber: ['', Validators.required],
    scheduledDate: [new Date().toISOString().substring(0, 16), Validators.required],
    truckId: [null],
    loadIds: [[], this.atLeastOneLoad]
  }, { nonNullable: true });



  get routeNumber() {
    return this.form.get('routeNumber');
  }

  get scheduledDate() {
    return this.form.get('scheduledDate');
  }

  get truckId() {
    return this.form.get('truckId');
  }

  get loadsControl() {
    return this.form.get('loadIds');
  }

  ngOnInit() {
    this.getAllLoads();
    this.getAllTrucks();
  }


  getAllLoads() {
    this.loadService.getAll().subscribe(ls => {
      this.loads = ls.filter(l => !l.routeId);
    });
  }

  getAllTrucks() {
    this.truckService.getAll().subscribe(ls => {
      this.availableTrucks = ls.filter(t => t.status === 'Available');;
    });
  }

  onCheckboxChange(id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const arr = this.form.value.loadIds as string[];
    if (checked) {
      this.form.patchValue({ loadIds: [...arr, id] });
    } else {
      this.form.patchValue({ loadIds: arr.filter(x => x !== id) });
    }

    this.loadsControl?.markAsTouched();
  }

  onSubmit() {
    this.error = null;
    this.loading = true;


    let selectedTruck = this.availableTrucks.filter(at => at.id == this.truckId?.value)[0];
    let selectedLoads = this.loads.filter(l => this.form.value.loadIds.includes(l.id));
    let totalLoadCapacity = selectedLoads.reduce((sum, load) => sum + (load.capacity || 0), 0);
    if (selectedTruck && totalLoadCapacity > selectedTruck.capacity) {
      alert("Total load capacity " + totalLoadCapacity + " exceeds truck capacity " + selectedTruck.capacity);
      this.loading = false;
      return;
    }
    const dto = {
      ...this.form.value,
      scheduledDate: new Date(this.form.value.scheduledDate).toISOString(),
    };
    this.routeService.create(dto).subscribe({
      next: () => this.router.navigate(['/routes']),
      error: (error) => { alert(error.error); this.loading = false; }
    });
  }

  goBack() {
    this.router.navigate(['/routes']);
  }
}
