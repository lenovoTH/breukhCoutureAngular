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


    private deleteBehaviour =  new BehaviorSubject<number>(0);

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

  addArticle(article: Article) {
    return this.http.post(this.url, article, this.httpOptions);
  }

  updateArticle(id: string, libelle: string) {
    return this.http.put(this.urlA+"article" + '/' + id, { libelle: libelle });
  }

  deleteArticle(id: number) {
    return this.http.delete(this.urlA+"articles" + '/' + id);
  }

  setValue(value: FournisseurSubject) {
    this.myBehaviorSubject.next(value)
  }

  getValue() {
    return this.myBehaviorSubject.asObservable();
  }


  setValueDelete(value: number) {
    this.deleteBehaviour.next(value)
  }

  getValueDelete() {
    return this.deleteBehaviour.asObservable();
  }


}
