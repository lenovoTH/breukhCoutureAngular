import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './form/form.component';
import { ListeComponent } from './liste/liste.component';
import { ItemComponent } from './item/item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Form2Component } from './form2/form2.component';
import { Article2Component } from './article2/article2.component';
import { Item2Component } from './item2/item2.component';
import { Liste2Component } from './liste2/liste2.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    ItemComponent,
    PaginationComponent,
    Form2Component,
    Article2Component,
    Item2Component,
    Liste2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
