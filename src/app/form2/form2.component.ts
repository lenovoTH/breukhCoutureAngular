import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleVente, Categorie } from '../model/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component {

  myForm2!: FormGroup
  constructor(private formbuilder: FormBuilder,) {
    this.myForm2 = this.formbuilder.group({
      libelle: ["", Validators.required],
      prix: ["", Validators.required],
      stock: ["", Validators.required],
      categorie: ["", Validators.required],
      reference: ["", Validators.required],
      photo: ['', Validators.required],
      cout: ['', Validators.required],
      promo: ['', Validators.required],
      marge: ['', Validators.required],
      quantiteStock: ['', Validators.required],
      articleConfection: [[], Validators.required]
    })
  }

  dataInsert!: ArticleVente
  @Input() categories: Categorie[] = []
  @Output() insertEvent: EventEmitter<ArticleVente> = new EventEmitter<ArticleVente>();

  // createForm(articleV: ArticleVente) {
  //   this.myForm2 = this.formbuilder.group({
  //     libelle: [articleV.libelle, Validators.required],
  //     prix: [articleV.prix, Validators.required],
  //     stock: [articleV.quantiteStock, Validators.required],
  //     categorie: [articleV.categorie.libelle, Validators.required],
  //     reference: ["", Validators.required],
  //     photo: ['', Validators.required],
  //     cout: ['', Validators.required],
  //     promo: ['', Validators.required],
  //     marge: ['', Validators.required],
  //     articleConfection: [articleV.articleConfection, Validators.required]
  //   })
  // }

  submit() {
    if (this.myForm2.valid) {
      console.log(this.myForm2.value);
      this.dataInsert = this.myForm2.value
      this.insertEvent.emit(this.dataInsert);
    }
  }

  selectCategorie(event: Event) {
    console.log(event);
  }















}
