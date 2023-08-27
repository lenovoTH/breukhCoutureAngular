import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ArticleVenteService } from '../services/article-vente.service';
import { AllVente, ArticleVente, Categorie, Fournisseur } from '../model/model';

@Component({
  selector: 'app-article2',
  templateUrl: './article2.component.html',
  styleUrls: ['./article2.component.css']
})
export class Article2Component {

  articlesVente: ArticleVente[] = []
  categories: Categorie[] = []
  fournisseurs: Fournisseur[] = []
  constructor(private venteservice: ArticleVenteService) { }

  ngOnInit() {
    this.fetchArticleVente()
  }

  fetchArticleVente() {
    this.venteservice.getAllData().subscribe((value: AllVente) => {
      this.articlesVente = value.articlesVente
      this.categories = value.categories
      this.fournisseurs = value.fournisseurs
      console.log(this.articlesVente);
    })
  }

  addArticles(event: ArticleVente) {
    this.venteservice.addData(event).subscribe((value: ArticleVente) => {
      console.log(value);
      
    })
  }
}