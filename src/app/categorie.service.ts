import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  private url: string = "http://127.0.0.1:8000/api/categories"
  private urlsearch: string = "http://127.0.0.1:8000/api/categorie/"
  private urlAll: string = "http://127.0.0.1:8000/api/allcategories"


  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getCategories(page: number) {
    return this.http.get(this.url + '?page=' + page);
  }
  
  AllCategories() {
    return this.http.get(this.urlAll);
  }

  addCategorie(libelle: string) {
    return this.http.post(this.url, { libelle: libelle }, this.httpOptions);
  }

  // searchCategorie(libelle: string): Observable<boolean> {
  //   return this.http.get<boolean>(this.urlsearch + '?libelle=' + libelle)
  // }

  updateCategorie(id: number, libelle: string) {
    return this.http.put(this.url + '/' + id, { libelle: libelle });
  }

  deleteCategorie(id: number[]) {
    return this.http.delete(this.url + '/' + id);
  }
}