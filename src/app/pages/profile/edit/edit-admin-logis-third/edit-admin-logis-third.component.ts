import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user/user';

@Component({
  selector: 'app-edit-admin-logis-third',
  templateUrl: './edit-admin-logis-third.component.html',
  styleUrls: ['./edit-admin-logis-third.component.scss'],
})
export class EditAdminLogisThirdComponent implements OnInit {

  @Input()dataUser: User;

  form: FormGroup;
  toastMessage = '';


  errors: string[] = [];

  statusInputName = 'regular';
  statusInputMessageName = '';

  statusInputLastName = 'regular';
  statusInputMessageLastName = '';

  statusInputEmail = 'regular';
  statusInputMessageEmail = '';

  statusInputDocument = 'regular';
  statusInputMessageDocument = '';

  statusInputSap = 'regular';
  statusInputMessageSap = '';

  statusInputPhone = 'regular';
  statusInputMessagePhone = '';

  statusInputCompany = 'regular';
  statusInputMessageCompany = '';

  statusInputNit = 'regular';
  statusInputMessageNit = '';
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formBuilderInput();
    this.form.get('firstName').setValue(this.dataUser.firstName);
    this.form.get('lastName').setValue(this.dataUser.lastName);
    this.form.get('email').setValue(this.dataUser.email);
    this.form.get('document').setValue(this.dataUser.document);
    this.form.get('phoneNumber').setValue(this.dataUser.phoneNumber);
    this.form.get('nameCompany').setValue(this.dataUser.company.companyName);
    this.form.get('nitCompany').setValue(this.dataUser.company.companyNit);
  }

  /*=============================================
   FORMULARIO REACTIVOS
  =============================================*/
  formBuilderInput(){
    this.form = this.formBuilder.group({
      typeConveyorId: ['', [
        Validators.required,
      ]],
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      document: ['', [
        Validators.required,
      ]],
      role: ['AdminLogis', [
        Validators.required,
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]],
      nameCompany: ['', [
        Validators.required,
      ]],
      nitCompany: ['', [
        Validators.required,
      ]],

    });
    this.form.valueChanges
    .pipe(
      debounceTime(350),
    )
    .subscribe(data => {
      this.validateInput();
    });
  }

  /*=============================================
   FUNCIÓN PARA VALIDAR LOS CAMPOS
  =============================================*/
  validateInput(){

    if(this.form.get('firstName').errors && this.form.get('firstName').dirty){
      this.statusInputName = 'error';
      this.statusInputMessageName = 'Este campo es requerido';
     }else{
      this.statusInputName = 'regular';
      this.statusInputMessageName = '';
     }

     if(this.form.get('lastName').errors && this.form.get('lastName').dirty){
      this.statusInputLastName = 'error';
      this.statusInputMessageLastName = 'Este campo es requerido';
     }else{
      this.statusInputLastName = 'regular';
      this.statusInputMessageLastName = '';
     }

     if(this.form.get('email').errors && this.form.get('email').dirty){
        if(this.form.get('email').errors.email){
          this.statusInputEmail = 'error';
          this.statusInputMessageEmail = 'Ingrese un correo electrónico válido';
        }else{
          this.statusInputEmail = 'error';
        this.statusInputMessageEmail = 'Este campo es requerido';
        }
     }else{
      this.statusInputEmail = 'regular';
      this.statusInputMessageEmail = '';
     }

     if(this.form.get('document').errors && this.form.get('document').dirty){
      this.statusInputDocument = 'error';
      this.statusInputMessageDocument = 'Este campo es requerido';
     }else{
      this.statusInputDocument = 'regular';
      this.statusInputMessageDocument = '';
     }

     if(this.form.get('phoneNumber').errors && this.form.get('phoneNumber').dirty){

      if(this.form.get('phoneNumber').errors.minlength || this.form.get('phoneNumber').errors.maxlength){
        this.statusInputPhone = 'error';
        this.statusInputMessagePhone = 'Ingrese un número de celular válido';
      }else{
        this.statusInputPhone = 'error';
        this.statusInputMessagePhone = 'Este campo es requerido';
      }

     }else{
      this.statusInputPhone = 'regular';
      this.statusInputMessagePhone = '';
     }

     if(this.form.get('nameCompany').errors && this.form.get('nameCompany').dirty){
      this.statusInputCompany = 'error';
      this.statusInputMessageCompany = 'Este campo es requerido';
     }else{
      this.statusInputCompany = 'regular';
      this.statusInputMessageCompany = '';
     }

     if(this.form.get('nitCompany').errors && this.form.get('nitCompany').dirty){
      this.statusInputNit = 'error';
      this.statusInputMessageNit = 'Este campo es requerido';
     }else{
      this.statusInputNit = 'regular';
      this.statusInputMessageNit = '';
     }
  }
}

