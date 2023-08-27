import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { AllData, Article, Categorie, Fournisseur, FournisseurSubject } from '../model/model';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  allcat: Categorie[] = []
  allfourn: Fournisseur[] = []
  allarticles: Article[] = []
  modif!: Article
  alldata: any[] = []
  article!: Article

  // lastElement: any
  constructor(private articleservice: ArticleService) { }

  ngOnInit() {
    this.fetchAllData()
  }

  fetchAllData() {
    this.articleservice.getAllData().subscribe((value: AllData) => {
      // console.log(value);
      this.allarticles = value.articles;
      this.allcat = value.categories;
      this.allfourn = value.fournisseurs;
    })
  }

  articleForm(event: Article) {
    this.modif = event
    // console.log(this.modif);
  }

  insertArticle(event: any) {
    const formDataObject: any = {};
    event.forEach((value: any, key: any) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
    if (event != null) {
      this.articleservice.updateArticle(formDataObject).subscribe((value: Article) => {
        console.log(value);
      })
    } else {
      this.articleservice.addArticle(formDataObject).subscribe((value) => {
        console.log(value)
        this.fetchAllData()
      })
    }
  }

  // insertArticle(event: any) {
  //   // const even = event.target as HTMLInputElement
  //   console.log(event);
  //   const formDataObject: any = {};
  //   event.forEach((value: any, key: any) => {
  //     formDataObject[key] = value;
  //   });
  //   console.log(formDataObject);
  //   this.articleservice.addArticle(formDataObject).subscribe((value) => {
  //     console.log(value)
  //     this.fetchAllData()
  //   })
  // }

  // modifArticle(event: any) {
  //   console.log(event);
  //   this.articleservice.updateArticle(event).subscribe((value: Article) => {
  //     console.log(value);
  //   })
  // }

  recupDataEnfant(event: string) {
    // console.log(event)
    const catCompare: Fournisseur[] = []
    this.allarticles.forEach(element => {
      if (element.categorie.libelle == event) {
        catCompare.push(element)
      }
    });
    // console.log(this.catCompare.length + 1);
    this.articleservice.setValue({ fournisseur: catCompare[catCompare.length - 1], position: catCompare.length })
  }

  supprimer(event: number) {
    this.articleservice.deleteArticle(event).subscribe(data => {
      this.fetchAllData()
    })
  }

}
