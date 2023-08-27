import { Component, Input } from '@angular/core';
import { ArticleVente } from '../model/model';

@Component({
  selector: 'app-liste2',
  templateUrl: './liste2.component.html',
  styleUrls: ['./liste2.component.css']
})
export class Liste2Component {

  // pageSize = 5;
  currentPage = 1;
  @Input() articlesV: ArticleVente[] = []

}
