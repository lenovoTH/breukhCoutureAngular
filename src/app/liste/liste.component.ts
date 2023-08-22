import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../model/model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  constructor(private articleService: ArticleService) { }

  @Input() articles: any[] = []
  @Output() itemEventDelete = new EventEmitter<number>();
  @Output() itemEventModif = new EventEmitter<Article>();


  deleteItem(id: number) {
    this.itemEventDelete.emit(id);
  }

  modifItem(article:Article) {
    this.itemEventModif.emit(article);
    console.log(article);
  }
  
}

