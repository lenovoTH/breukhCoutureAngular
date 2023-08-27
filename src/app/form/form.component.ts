import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';
// import { Observable } from 'rxjs';
import { Article, Categorie, Fournisseur } from '../model/model';

// import { Observable, from, partition } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnChanges {
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
  idFourn: number = 0

  image: any = "assets/img/couture.jpg";
  isChanged: boolean = false;
  file: any;

  @Input() categories: Categorie[] = []
  @Input() fournisseurs: Fournisseur[] = []
  @Input() articles: Article[] = []
  @Input() articlemodif!: Article

  @Output() itemEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() formDataArticle: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() articleModifier: EventEmitter<Article> = new EventEmitter<Article>();

  @ViewChild('ref') refElement!: ElementRef;

  ngOnChanges() {
    this.libelle = this.ref
    let formvide: Article = {
      id: 0,
      libelle: "", prix: 0, stock: 0,
      categorie: { libelle: "", id: 0, type:"" },
      fournisseur: { libelle: "", id: 0, categorie: { libelle: "", id: 0, type:"" } },
      reference: "",
      photo: ""
    }

    if (this.articlemodif == null) {
      this.createForm(formvide)
    }
    else {
      this.refElement.nativeElement.value = this.articlemodif.reference
      this.createForm(this.articlemodif)
    }
  }

  createForm(article: Article) {
    this.myForm = this.formbuilder.group({
      libelle: [article.libelle, Validators.required],
      prix: [article.prix, Validators.required],
      stock: [article.stock, Validators.required],
      categorie: [article.categorie.libelle, Validators.required],
      fournisseur: [article.fournisseur.libelle, Validators.required],
      reference: ["", Validators.required],
      photo: ['', Validators.required],
    })
  }

  selectCategorie(event: Event) {
    const even = event.target as HTMLInputElement
    this.itemEvent.emit(even.value);
    this.articleservice.getValue().subscribe((value) => {
      if (value.fournisseur != undefined) {
        let pos: number = Number(value.position)
        pos = pos + 1
        this.categorie = value.fournisseur.categorie.libelle + '-' + pos;
        this.myForm.addControl('reference', this.formbuilder.control(this.libelle + this.categorie))
        // console.log(this.categorie);
      } else {
        this.categorie = even.value + '-' + 1;
        this.myForm.addControl('reference', this.formbuilder.control(this.libelle + this.categorie))
      }
      // console.log(value);
    })
  }

  reference(lib: any) {
    this.libelle = this.ref + lib.value.substring(0, 3).toUpperCase()
      + '-' + this.categorie.toUpperCase()
    // console.log(this.articles);
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
    this.idFourn = fourn.id
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
    console.log(this.articlemodif);
    const formData = new FormData
    formData.append('libelle', this.myForm.value.libelle)
    formData.append('prix', this.myForm.value.prix)
    formData.append('stock', this.myForm.value.stock)
    formData.append('categorie', this.myForm.value.categorie)
    formData.append('fournisseur', this.idFourn.toString())
    formData.append('photo', this.file)
    if (this.articlemodif == null) {
      formData.append('reference', this.myForm.value.reference)
    } else {
      console.log(this.refElement.nativeElement.value);
      console.log(this.myForm.value);
      formData.append('reference', this.refElement.nativeElement.value)
      formData.append('id', this.articlemodif.id.toString())
    }
    this.formDataArticle.emit(formData);
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
