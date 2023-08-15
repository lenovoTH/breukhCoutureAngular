import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {


  imageShow: any = "assets/img/couture.jpg";
  isChanged : boolean = false;

  file: any;





  onFileChange(event: any) {
    this.isChanged = true;
    this.file = event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {

      this.imageShow = (<FileReader>event.target).result;

    }
  }




}
