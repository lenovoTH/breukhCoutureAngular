import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { Article, Categorie, Fournisseur } from '../model/model';

// import { Observable, from, partition } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(private formbuilder: FormBuilder,
    private articleservice: ArticleService) { }

  myForm!: FormGroup
  tabFournisseurs: Fournisseur[] = []
  checkFourn: boolean = false
  allCheck: any = []
  ref: string = 'REF-'
  libelle: string = ""
  categorie: string = ""
  fournSelectionner: Fournisseur[] = []
  fournSupprimer: Fournisseur[] = []
  tabArticles: Article[] = []

  image: any = "assets/img/couture.jpg";
  isChanged: boolean = false;
  file: any;

  @Input() categories: Categorie[] = []
  @Input() fournisseurs: Fournisseur[] = []
  @Input() articles: Article[] = []
  // @Output() article = new EventEmitter<any>();
  @Output() itemEvent = new EventEmitter<string>();
  @Output() formDataArticle: EventEmitter<FormData> = new EventEmitter<FormData>();

  ngOnInit() {
    this.libelle = this.ref
    this.myForm = this.formbuilder.group({
      libelle: ['', Validators.required],
      prix: ['', Validators.required],
      stock: ['', Validators.required],
      categorie: ['', Validators.required],
      fournisseur: ['', Validators.required],
      photo: ['',Validators.required],
    })
  }

  selectCategorie(event: Event) {
    const even = event.target as HTMLInputElement
    this.itemEvent.emit(even.value);
    this.articleservice.getValue().subscribe((value) => {
      console.log(value);
      if (value.fournisseur != undefined) {
        let pos: number = Number(value.position)
        pos = pos + 1
        this.categorie = value.fournisseur.categorie.libelle + '-' + pos;
        this.myForm.addControl('reference', this.formbuilder.control(this.libelle + this.categorie))
        console.log(this.categorie);
      }
      // console.log(value);
    })
  }

  reference(lib: any) {
    this.libelle = this.ref + lib.value.substring(0, 3).toUpperCase()
      + '-' + this.categorie.toUpperCase()
    console.log(this.articles);
    // console.log(cat);
  }

  findFournisseur(event: any) {
    this.tabFournisseurs = this.fournisseurs.filter((e: any) => {
      if (event.target.value == "") {
        this.tabFournisseurs = []
      }
      else {
        // console.log(e);
        return e.libelle.toLowerCase().includes(event.target.value.toLowerCase())
      }
    })
    // console.log(this.tabFournisseurs);
  }

  selectFourn(fourn: Fournisseur) {
    this.fournSelectionner.push(fourn)
    this.fournisseurs.forEach((element: Fournisseur, i) => {
      if (fourn.id == element.id) {
        this.fournisseurs.splice(i, 1)
      }
    });
    this.tabFournisseurs.forEach((element: Fournisseur, i) => {
      if (fourn.id == element.id) {
        this.tabFournisseurs.splice(i, 1)
      }
    });
  }

  suppfourn(fourn: Fournisseur) {
    this.fournSelectionner.forEach((element, i) => {
      if (fourn.id = element.id) {
        this.fournSelectionner.splice(i, 1)
        this.fournisseurs.push(fourn)
        console.log(this.fournSelectionner);
      }
    });
  }

  submitForm() {
    // console.log(this.myForm.value);
    const formData = new FormData
    formData.append('libelle', this.myForm.value.libelle)
    formData.append('prix', this.myForm.value.prix)
    formData.append('stock', this.myForm.value.stock)
    formData.append('categorie', this.myForm.value.categorie)
    formData.append('fournisseur', this.myForm.value.fournisseur)
    formData.append('reference', this.myForm.value.reference)
    formData.append('image', this.file)
    this.formDataArticle.emit(formData);
    // const formDataObject: any = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    // console.log(formDataObject);
    // console.log(formData);
    // console.log(formData);
  }

  addImg(event: any) {
    this.file = event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.image = (<FileReader>event.target).result;
    }
  }
}

