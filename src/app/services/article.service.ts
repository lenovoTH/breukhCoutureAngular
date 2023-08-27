import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AllData, Article, Categorie, Fournisseur, FournisseurSubject } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  private myBehaviorSubject = new BehaviorSubject<FournisseurSubject>(
    { 'fournisseur': { 'id': 0, 'libelle': "", 'categorie': { 'id': 0, 'libelle': "",'type':"" } }, position: 0 });

  // private deleteBehaviour = new BehaviorSubject<number>(0);
  private modifBehaviour = new BehaviorSubject<Article>({
    id: 0,
    libelle: "", prix: 0, stock: 0,
    categorie: { libelle: "", id: 0, type:"" },
    fournisseur: { libelle: "", id: 0, categorie: { libelle: "", id: 0, type:"" } },
    reference: "", photo: ""
  });

  private url: string = "http://127.0.0.1:8000/api/"

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getAllData(): Observable<AllData> {
    return this.http.get<AllData>(this.url + 'alldata');
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'alldata', article, this.httpOptions);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + "articles" + '/' + article.id, article);
  }

  deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(this.url + "articles" + '/' + id);
  }

  setValue(value: FournisseurSubject) {
    this.myBehaviorSubject.next(value)
  }

  getValue() {
    return this.myBehaviorSubject.asObservable();
  }

  // setValueModif(value: Article) {
  //   this.modifBehaviour.next(value)
  // }

  // getValueModif() {
  //   return this.modifBehaviour.asObservable();
  // }



  // setValueDelete(value: number) {
  //   this.deleteBehaviour.next(value)
  // }

  // getValueDelete() {
  //   return this.deleteBehaviour.asObservable();
  // }

  

}