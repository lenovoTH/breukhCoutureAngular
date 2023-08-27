import { Injectable } from '@angular/core';
import { AbstractServiceService } from './abstract-service.service';
import { AllData, AllVente, ArticleVente } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenteService extends AbstractServiceService<any>{

  override url() {
    return 'article-vente'
  }
  
}