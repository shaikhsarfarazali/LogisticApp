import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {

    private apiUrl = `${environment.apiUrl}routes`;
    private http = inject(HttpClient);

    getAll(): Observable<Route[]> {
        return this.http.get<Route[]>(this.apiUrl);
    }

    getById(id: string): Observable<Route> {
        return this.http.get<Route>(`${this.apiUrl}/${id}`);
    }

    create(data: Partial<Route>): Observable<Route> {
        return this.http.post<Route>(this.apiUrl, data);
    }

    assignTruck(routeId: string, truckId: string) {
        return this.http.put(`${this.apiUrl}/${routeId}/assign-truck`, { truckId });
    }
}