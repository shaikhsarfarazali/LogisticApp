import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../core/api/route.service';
import { Route } from '../../../core/models/route.model';
import { sharedImports } from '../../../shared/shared-imports';

@Component({
  selector: 'app-route-detail',
  imports: [sharedImports],
  templateUrl: './route-detail.component.html',
  styleUrl: './route-detail.component.scss'
})
export class RouteDetailComponent implements OnInit {
  private routeSvc = inject(RouteService);
  private activatedRoute = inject(ActivatedRoute);

  route: Route | null = null;
  loading = true;

  ngOnInit() {
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
}