import { Routes } from '@angular/router';
import { LoadsListComponent } from './features/loads/loads-list/loads-list.component';
import { TrucksListComponent } from './features/trucks/trucks-list/trucks-list.component';
import { RoutesListComponent } from './features/routes/routes-list/routes-list.component';
import { RouteDetailComponent } from './features/routes/route-detail/route-detail.component';
import { LoadDetailComponent } from './features/loads/load-detail/load-detail.component';
import { RouteCreateComponent } from './features/routes/route-create/route-create.component';
import { TruckDetailComponent } from './features/trucks/truck-detail/truck-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'loads', pathMatch: 'full' },
    { path: 'loads', component: LoadsListComponent },
    { path: 'loads/create', component: LoadDetailComponent },
    { path: 'trucks', component: TrucksListComponent },
    { path: 'trucks/create', component: TruckDetailComponent },
    { path: 'routes', component: RoutesListComponent },
    { path: 'routes/create', component: RouteCreateComponent },
    { path: 'routes/:id', component: RouteDetailComponent }
];
