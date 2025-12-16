import { Component, inject, OnInit } from '@angular/core';
import { RouteService } from '../../../core/api/route.service';
import { Route } from '../../../core/models/route.model';
import { sharedImports } from '../../../shared/shared-imports';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-routes-list',
  imports: [sharedImports, RouterModule],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.scss'
})
export class RoutesListComponent implements OnInit {
  private router = inject(Router);
  private routeService = inject(RouteService);

  routes: Route[] = [];
  loading = true;

  ngOnInit() {
    this.routeService.getAll().subscribe({
      next: data => {
        this.routes = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to fetch routes');
      }
    });
  }

  redirectToCreateRoute() {
    this.router.navigate(['/routes/create']);
  }
}