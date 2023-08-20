import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article, Categorie, Fournisseur, FournisseurSubject } from '../model/model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  allcat: Categorie[] = []
  allfourn: Fournisseur[] = []
  allarticles: Article[] = []
  alldata: any[] = []
  article!: Article

  lastElement: any
  constructor(private articleservice: ArticleService) { }

  ngOnInit() {
    this.fetchAllData()
  }

  fetchAllData() {
    this.articleservice.getAllData().subscribe({
      next: (value: any) => {
        this.allarticles = value.articles;
        this.allcat = value.categories;
        this.allfourn = value.fournisseurs;
      }
    })
  }

  insertArticle(event: FormData) {
    // const even = event.target as HTMLInputElement
    console.log(event);
    const formDataObject: any = {};
    event.forEach((value: any, key: any) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    this.articleservice.addArticle(event).subscribe((value) => {
      console.log(value);
    })
  }

  recupDataEnfant(event: string) {
    // console.log(event)
    const catCompare: Fournisseur[] = []
    this.allarticles.forEach(element => {
      if (element.categorie.id == +event) {
        catCompare.push(element)
      }
    });
    // console.log(this.catCompare.length + 1);
    this.articleservice.setValue({ fournisseur: catCompare[catCompare.length - 1], position: catCompare.length })
  }

















  // fetchCategories() {
  //   this.categorieservice.AllCategories().subscribe({
  //     next: (value: any) => {
  //       this.allcat = value
  //     }
  //   })
  // }

  // fetchFournisseurs() {
  //   this.fournisseurservice.getFournisseurs().subscribe({
  //     next: (value: any) => {
  //       // console.log(value);
  //       this.allfourn = value
  //     }
  //   })
  // }

  // fetchArticles() {
  //   this.articleservice.getArticles().subscribe({
  //     next: (value: any) => {
  //       console.log(value.data);
  //       this.allarticles = value.data
  //       this.lastElement = this.allarticles[this.allarticles.length - 1]
  //     }
  //   })
  // }



}