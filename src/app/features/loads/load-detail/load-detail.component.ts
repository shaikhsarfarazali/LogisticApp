import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadService } from '../../../core/api/load.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './load-detail.component.html',
  styleUrl: './load-detail.component.scss'
})
export class LoadDetailComponent {
  private fb = inject(FormBuilder);
  private loadService = inject(LoadService);
  private router = inject(Router);

  form = this.fb.group({
    referenceNumber: ['', [Validators.required, Validators.maxLength(20)]],
    pickupAddress: ['', [Validators.required, Validators.maxLength(100)]],
    deliveryAddress: ['', [Validators.required, Validators.maxLength(100)]],
  }, { nonNullable: true });

  get referenceNumber() {
    return this.form.get('referenceNumber');
  }

  get pickupAddress() {
    return this.form.get('pickupAddress');
  }

  get deliveryAddress() {
    return this.form.get('deliveryAddress');
  }

  loading = false;
  error: string | null = null;

  onSubmit() {
    this.form.markAllAsTouched();
    this.error = null;
    if (this.form.invalid) return;
    this.loading = true;
    this.loadService.create(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/loads']);
      },
      error: e => {
        this.error = 'Creation failed';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/loads']);
  }
}
