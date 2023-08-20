import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article, Categorie, Fournisseur, FournisseurSubject } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  private myBehaviorSubject = new BehaviorSubject<FournisseurSubject>(
    { 'fournisseur': { 'id': 0, 'libelle': "", 'categorie': { 'id': 0, 'libelle': "" } }, position: 0 });

  urlA: string = "http://127.0.0.1:8000/api/"
  private url: string = "http://127.0.0.1:8000/api/alldata"

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getAllData() {
    return this.http.get(this.url);
  }

  addArticle(article: FormData) {
    return this.http.post(this.url, article, this.httpOptions);
  }

  updateArticle(id: string, libelle: string) {
    return this.http.put(this.url + '/' + id, { libelle: libelle });
  }

  deleteArticle(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  setValue(value: FournisseurSubject) {
    this.myBehaviorSubject.next(value)
  }

  getValue() {
    return this.myBehaviorSubject.asObservable();
  }
}