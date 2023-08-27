import { Injectable } from '@angular/core';
// import { AllData, Article } from '../model/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractServiceService<T> {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  abstract url(): string;

  getAllData(): Observable<T> {
    return this.http.get<T>(`${environment.uri}${this.url()}`);
  }

  addData(body: T): Observable<T> {
    return this.http.post<T>(`${environment.uri}${this.url()}`, body, this.httpOptions);
  }

  updateData(body: T): Observable<T> {
    return this.http.post<T>(`${environment.uri}${this.url()}`, body);
  }

  deleteData(id: number): Observable<T> {
    return this.http.delete<T>(`${environment.uri}${this.url()}` + id);
  }

}
