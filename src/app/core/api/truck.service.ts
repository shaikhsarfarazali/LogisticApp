import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Truck } from '../models/truck.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TruckService {
    private apiUrl = `${environment.apiUrl}trucks`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Truck[]> {
        return this.http.get<Truck[]>(this.apiUrl);
    }

    get(id: string): Observable<Truck> {
        return this.http.get<Truck>(`${this.apiUrl}/${id}`);
    }

    create(data: Partial<Truck>): Observable<Truck> {
        return this.http.post<Truck>(this.apiUrl, data);
    }
}