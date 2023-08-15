import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  constructor(private service: CategorieService, private formBuilder: FormBuilder) { }
  myForm!: FormGroup;

  pagination: number = 1
  allPages: number = 0
  donnees: any = []
  libelle: string = ""
  idcheckbox: number = 1
  tabAll: any = []
  tabCheckbox: number[] = []
  inputListe: string = ""
  btnswitch: boolean = false
  btnok: boolean = true
  btnSupp: boolean = true
  checkbox: boolean = false
  switch: boolean = false
  onecheck: boolean = false

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.fetchCategories()
    this.toutesCategories()
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------


  fetchCategories() {
    this.service.getCategories(this.pagination).subscribe({
      next: (value: any) => {
        this.donnees = value.data
        // console.log(this.donnees);
        this.allPages = value.total
      },
      error: (message: string) => {
        console.log(message);
      }
    })
  }

  changerPage(event: any) {
    this.pagination = event
    this.fetchCategories()
  }

  toutesCategories() {
    this.service.AllCategories().subscribe({
      next: (value) => {
        this.tabAll = value
      }
    })
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  ajoutCategorie() {
    this.service.addCategorie(this.myForm.value.libelle).subscribe({
      next: (value: any) => {
        this.donnees = value
        this.myForm.reset()
        this.btnok = true
        this.fetchCategories()
      },
      error: (message: string) => {
        console.log(message);
      }
    })
  }

  find(libelle: any) {
    const notif = document.querySelector('.notif') as HTMLDivElement
    if (libelle.value.length == 0) {
      this.btnok = true;
      // notif.innerHTML = "le libelle doit avoir au moins 3 caractères";
      // notif.style.color = "red"
    }
    if (libelle.value.length >= 3) {
      this.btnok = this.tabAll.some((p: any) => p.libelle === libelle.value)
      notif.innerHTML = "";
    } else if (!this.btnok) {
      this.btnok = false;
      // notif.innerHTML = "le libelle doit avoir au moins 3 caractères";
      // notif.style.color = "red"
    }
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  modifCategorie() {
    this.service.updateCategorie(this.idcheckbox, this.myForm.value.libelle).subscribe({
      next: (value) => {
        // console.log(value);
        this.myForm.value.libelle = ""
        this.fetchCategories()
      }
    })
  }

  testswitch(event: any) {
    if (event.target.checked) {
      this.switch = true
    }
    else {
      this.switch = false
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

  recup(inputListe: any, idcheckbox: any, libelle: any) {
    // console.log(inputListe.value);
    // console.log(idcheckbox.value);
    if (this.switch) {
      libelle.value = inputListe.value
      this.idcheckbox = idcheckbox.value
      this.find(libelle)
    }
    else {
      // libelle.value = ""
      this.myForm.reset()
    }
  }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  suppression(tabCheckbox: any, event:any) {
    tabCheckbox.forEach((element: any) => {
      this.service.deleteCategorie(element).subscribe({
        next: (value) => {
          console.log('supprimé avec succes');
          this.etatCheck(event)
          this.btnSupp = true
          this.fetchCategories()
        }
      })
    });
  }

  etatCheck(event: any) {
    event.target.onecheck = !event.target.onecheck
  }

  recupCheck(idcheckbox: any) {
    if (!this.checkbox) {
      this.btnSupp = false
      this.tabCheckbox.push(idcheckbox.value)
    }
    else { console.log("breukh") }
  }

  allCheck(event: any) {
    const toutcheck = document.querySelectorAll('.toutcheck') as NodeListOf<HTMLInputElement>;
    if (event.target.checked == true) {
      this.tabCheckbox = []
      toutcheck.forEach(element => {
        element.checked = true
        this.tabCheckbox.push(+element.value)
      });
      this.btnSupp = false
    }
    else {
      this.onecheck = true
      toutcheck.forEach(element => {
        element.checked = false
      });
    }
  }
}
