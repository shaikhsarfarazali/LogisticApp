import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {

    private apiUrl = `${environment.apiUrl}routes`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Route[]> {
        return this.http.get<Route[]>(this.apiUrl);
    }

    getById(id: string): Observable<Route> {
        return this.http.get<Route>(`${this.apiUrl}/${id}`);
    }

    create(data: Partial<Route>): Observable<Route> {
        return this.http.post<Route>(this.apiUrl, data);
    }
}