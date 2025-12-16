import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Load } from '../models/load.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoadService {
    private apiUrl = `${environment.apiUrl}loads`;

    private http = inject(HttpClient);

    getAll(): Observable<Load[]> {
        return this.http.get<Load[]>(this.apiUrl);
    }
    get(id: string): Observable<Load> {
        return this.http.get<Load>(`${this.apiUrl}/${id}`);
    }
    create(data: Partial<Load>): Observable<Load> {
        return this.http.post<Load>(this.apiUrl, data);
    }
    update(id: string, data: Partial<Load>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}