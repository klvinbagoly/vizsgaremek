import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService<T extends { id: number | string, [key: string]: any }> {

  apiUrl = environment.apiUrl
  endString: string = ''

  constructor(
    protected http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${this.endString}`)
  }

  getOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.endString}/${id}`)
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${this.endString}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiUrl}${this.endString}/${entity.id}`,
      entity
    );
  }

  delete(entity: T): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${this.endString}/${entity.id}`
    );
  }
}
