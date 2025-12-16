import { Component, inject, OnInit } from '@angular/core';
import { LoadService } from '../../../core/api/load.service';
import { Load } from '../../../core/models/load.model';
import { sharedImports } from '../../../shared/shared-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loads-list',
  imports: [sharedImports],
  standalone: true,
  templateUrl: './loads-list.component.html',
  styleUrl: './loads-list.component.scss'
})
export class LoadsListComponent implements OnInit {
  loads: Load[] = [];
  loading = true;

  private loadApi = inject(LoadService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadApi.getAll().subscribe({
      next: (data) => {
        this.loads = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert('Error loading data');
      },
    });
  }

  redirectToCreateLoad() {
    this.router.navigate(['/loads/create']);
  }
}
