import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../model/model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor() { }

  @Input() article: any
  @Output() itemEvent = new EventEmitter<number>();
  @Output() iEvent = new EventEmitter<Article>();

  deleteItem(id: number) {
    this.itemEvent.emit(id)
  }

  modifItem(article:Article) {
    this.iEvent.emit(article)
    // console.log(article);
  }

}
