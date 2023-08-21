import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor(){}

  @Input() article: any
  @Output() itemEvent = new EventEmitter<number>();


  deleteItem(id:number){
  this.itemEvent.emit(id)
  }
}
