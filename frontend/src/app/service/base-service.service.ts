import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService<T extends { _id?: string, [key: string]: any }> {

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

  getOneByName(name: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${this.endString}/name/${name}`)
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${this.endString}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}${this.endString}/${entity._id}`,
      entity
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${this.endString}/${id}`
    );
  }
}
