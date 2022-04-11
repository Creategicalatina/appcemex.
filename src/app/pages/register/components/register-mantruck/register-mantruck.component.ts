import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';

@Component({
  selector: 'app-register-mantruck',
  templateUrl: './register-mantruck.component.html',
  styleUrls: ['./register-mantruck.component.scss'],
})
export class RegisterMantruckComponent implements OnInit {

  @Input() typeConveyor: number;
  @Output()
  propagar = new EventEmitter<boolean>();

  form: FormGroup;

  alertSucces = false;
  alertConfirm = false;

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

  constructor(
    private formBuilder: FormBuilder,
    private conveyorService: ConveyorService,
    private errorMessages: ErrorMessagesService,
  ) { }

  ngOnInit() {
    this.alertSucces = false;
    this.formBuilderInput();
    this.form.get('typeConveyorId').setValue(this.typeConveyor);
  }

  async register(){
    if(this.form.invalid){
      return;
    }
    this.propagar.emit(true);
    await this.conveyorService.registerManTruck(this.form.value).subscribe(async resp =>{
      this.propagar.emit(false);
      this.form.reset();
      this.alertSucces = true;
    }, (error) =>{
      this.propagar.emit(false);
      this.errors = this.errorMessages.parsearErroresAPI(error);
    });
  }

  openAlertConfirm(){
    if(this.form.invalid){
      return;
    }
    this.alertConfirm = true;
  }

  closeAlertConfirm(){
    this.alertConfirm = false;
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
      role: ['ManTruck', [
        Validators.required,
      ]],
      codeSap: ['', [
        Validators.required,
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
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

     if(this.form.get('codeSap').errors && this.form.get('codeSap').dirty){
      this.statusInputSap = 'error';
      this.statusInputMessageSap = 'Este campo es requerido';
     }else{
      this.statusInputSap = 'regular';
      this.statusInputMessageSap = '';
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
  }

}
