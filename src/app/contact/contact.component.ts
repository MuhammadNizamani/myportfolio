import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import  emailjs,{ EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  spin = false;
  alertShow = false;

  myForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    company: new FormControl('',[Validators.minLength(3), Validators.maxLength(20)]),
    subject: new FormControl('',[Validators.minLength(5),Validators.maxLength(50)]),
    message: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]),
  });

  color: ThemePalette = 'accent'

  constructor() { }

  ngOnInit(): void {
  }

  public sendEmail(e: Event) {
    this.spin = true;
    console.log(e.target);
    e.preventDefault();
    emailjs.sendForm('service_600rome', 'template_1hldu8g', e.target as HTMLFormElement, 'r3gb9yUyfaCpXq3_8')
    .then((result: EmailJSResponseStatus) => {
      this.spin = false;
      console.log("Status: ",result.text);
      this.alertShow = true;
      setTimeout(()=>{ this.alertShow = false }, 2000)

      this.myForm.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  get name(){
    return this.myForm.get('name');
  }

  get email(){
    return this.myForm.get('email');
  }

  get company(){
    return this.myForm.get('company');
  }
  get subject(){
    return this.myForm.get('subject');
  }

  get message(){
    return this.myForm.get('message');
  }



}
