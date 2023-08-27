import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';
import { Categorie, DTO } from '../model/model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  constructor(private service: CategorieService,
    private formBuilder: FormBuilder) { }
  myForm!: FormGroup;

  pagination: number = 1
  allPages: number = 0
  donnees: Categorie[] = []
  libelle: string = ""
  idcheckbox!: HTMLInputElement
  tabAll: Categorie[] = []
  tabCheckbox: string[] = []
  // nonCheck: string[] = []
  inputListe: string = ""
  btnswitch: boolean = false
  btnok: boolean = true
  btnSupp: boolean = true
  checkbox: boolean = false
  switch: boolean = false
  onecheck: boolean = false
  oneone: boolean = false
  grcheckbox: boolean = false
  inputLib: boolean = false
  valswitch2: boolean = false
  tablength!: number
  itemsPerPage: number = 5

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(3)]]//
    });
    this.fetchCategories()
    this.toutesCategories()
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  fetchCategories() {
    this.service.getCategories(this.pagination).subscribe((categorie: DTO) => {
      console.log(categorie);
      this.donnees = categorie.data,
        this.allPages = categorie.total
    })
  }

  toutesCategories() {
    this.service.AllCategories().subscribe({
      next: (value: Categorie[]) => {
        // console.log(value);
        this.tabAll = value
      }
    })
  }

  changerPage(event: number) {
    this.pagination = event
    if (this.lastPage(this.pagination, this.tabAll.length, this.itemsPerPage)) {
      console.log(this.recupnbreEl().length);
    }
    this.fetchCategories()
  }

  lastPage(currentPage: number, nbreElementTotal: number, itemsPerPage: number) {
    const total = Math.ceil(nbreElementTotal / itemsPerPage)
    return currentPage == total
  }

  recupnbreEl() {
    const elemsDebutpage = (this.pagination - 1) * this.itemsPerPage
    const elemsfinpage = elemsDebutpage + this.itemsPerPage
    return this.tabAll.slice(elemsDebutpage, elemsfinpage)
    // return this.tabrecup.length
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  ajoutCategorie() {
    this.service.addCategorie(this.myForm.value.libelle).subscribe({
      next: (value: Categorie) => {
        this.myForm.reset()
        this.btnok = true
        // this.btnSupp == false
        this.fetchCategories()
        this.toutesCategories()
      },
      error: (message: string) => {
        console.log(message);
      }
    })
  }

  find(libelle: HTMLInputElement) {
    // const notif = document.querySelector('.notif') as HTMLDivElement
    if (libelle.value.length < 3) {
      this.btnok = true;
      // notif.innerHTML = "le libelle doit avoir au moins 3 caractères";
      // notif.style.color = "red"
    }
    if (libelle.value.length >= 3) {
      console.log(this.tabAll.some((p: Categorie) => p.libelle === libelle.value));
      console.log(this.tabAll);

      this.btnok = this.tabAll.some((p: Categorie) => p.libelle === libelle.value)
      console.log(this.btnok);
      // notif.innerHTML = "";
    } else if (!this.btnok) {
      this.btnok = false;
      // notif.innerHTML = "le libelle doit avoir au moins 3 caractères";
      // notif.style.color = "red"
    }
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  modifCategorie() {
    this.service.updateCategorie(this.idcheckbox.value, this.myForm.value.libelle).subscribe({
      next: (value) => {
        // console.log(value);
        this.myForm.value.libelle = ""
        this.fetchCategories()
      }
    })
  }

  testswitch(event: HTMLInputElement) {
    if (event.checked) {
      this.switch = true
      this.myForm.controls['libelle'].disable()
      this.valswitch2 = this.btnok
      this.btnok = true
    }
    else {
      this.switch = false
      this.myForm.controls['libelle'].enable()
      this.btnok = this.valswitch2
    }
  }

  ajoutOuModif() {
    if (this.switch) {
      this.modifCategorie()
    }
    else {
      this.ajoutCategorie()
    }
  }

  recup(inputListe: HTMLInputElement, idcheckbox: HTMLInputElement, libelle: HTMLInputElement) {
    if (this.switch) {
      libelle.value = inputListe.value
      this.idcheckbox = idcheckbox
      this.find(libelle)
      this.myForm.controls['libelle'].enable()
    }
    else {
      this.myForm.reset()
    }
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  suppression() {
    this.tabCheckbox.forEach((element: string) => {
      this.service.deleteCategorie(element).subscribe({
        next: (value) => {
          console.log('supprimé avec succes');
          this.btnSupp = true
          this.fetchCategories()
        }
      })
    })
  }

  recupCheck(idcheckbox: string, event: Event) {
    const target = event.target as HTMLInputElement
    this.grcheckbox = false
    if (target.checked) {
      this.btnSupp = false
      this.tabCheckbox.push(idcheckbox)
      this.tablength = this.tabCheckbox.length
      console.log(this.tabCheckbox);
      if (this.tabCheckbox.length >= 5) {
        this.grcheckbox = true
      }
      else {
        this.grcheckbox = false
      }
    }
    else {
      this.tabCheckbox.forEach((element, i) => {
        if (element == idcheckbox) {
          this.tabCheckbox.splice(i, 1)
          if (this.grcheckbox = true && this.tabCheckbox.length < 5) {
            console.log('breuuuu');
            // console.log(!this.grcheckbox);
            this.grcheckbox = false
            console.log(this.grcheckbox);
          }
          console.log(this.tabCheckbox);
        }
      })
    }
  }

  allCheck(event2: Event) {
    const event = event2.target as HTMLInputElement
    const toutcheck = document.querySelectorAll('.toutcheck') as NodeListOf<HTMLInputElement>;
    this.tabCheckbox = []
    if (event.checked == true) {
      toutcheck.forEach(element => {
        element.checked = true
        this.tabCheckbox.push(element.value)
        this.tablength = this.tabCheckbox.length
      });
      // console.log(this.tabCheckbox);
      if (this.switch) {
        this.btnSupp = false
        this.onecheck = false
        this.grcheckbox = false
      }
    }
    else {
      this.btnSupp = true
      toutcheck.forEach(element => {
        element.checked = false
      })
    }
  }

}

