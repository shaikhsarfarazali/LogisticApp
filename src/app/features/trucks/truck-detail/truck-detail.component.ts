import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TruckService } from '../../../core/api/truck.service';
import { sharedImports } from '../../../shared/shared-imports';

@Component({
  selector: 'app-truck-detail',
  imports: [sharedImports],
  templateUrl: './truck-detail.component.html',
  styleUrl: './truck-detail.component.scss'
})
export class TruckDetailComponent {
  private fb = inject(FormBuilder);
  private truckService = inject(TruckService);
  private router = inject(Router);

  form = this.fb.group({
    registrationNumber: ['', Validators.required],
    model: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(1)]],
  }, { nonNullable: true });
  loading = false;
  error: string | null = null;

  get registrationNumber() {
    return this.form.get('registrationNumber');
  }

  get capacity() {
    return this.form.get('capacity');
  }

  get model() {
    return this.form.get('model');
  }

  onSubmit() {
    this.error = null;
    this.loading = true;
    this.truckService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/trucks']),
      error: () => { this.error = 'Failed to create'; this.loading = false; }
    });
  }

  goBack() {
    this.router.navigate(['/trucks']);
  }
}
