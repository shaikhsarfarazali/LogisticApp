import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../../core/api/route.service';
import { Route } from '../../../core/models/route.model';
import { sharedImports } from '../../../shared/shared-imports';
import { AssignTruckComponent } from '../../trucks/assign-truck/assign-truck.component';

@Component({
  selector: 'app-route-detail',
  imports: [sharedImports, AssignTruckComponent],
  templateUrl: './route-detail.component.html',
  styleUrl: './route-detail.component.scss'
})
export class RouteDetailComponent implements OnInit {
  private routeSvc = inject(RouteService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  route: Route | null = null;
  loading = true;

  ngOnInit() {
    this.loadRoute();
  }

  loadRoute() {
    this.loading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.routeSvc.getById(id).subscribe({
      next: (data) => {
        this.route = data;
        this.loading = false;
      },
      error: () => {
        this.route = null;
        this.loading = false;
      }
    });
  }

  reload() {
    this.loadRoute();
  }

  goBack() {
    this.router.navigate(['/routes']);
  }
}