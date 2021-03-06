import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';

@Component({
  selector: 'app-register-admin-logist-third',
  templateUrl: './register-admin-logist-third.component.html',
  styleUrls: ['./register-admin-logist-third.component.scss'],
})
export class RegisterAdminLogistThirdComponent implements OnInit {

  @Input() typeConveyor: number;
  @Output()
  propagar = new EventEmitter<boolean>();

  form: FormGroup;

  alertSucces = true;
  alertConfirm = false;
  addIdentityCard = false;
  addDocumentCompany = false;
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

  openPhotoIdentityCard = false;
  openPhotoDocumentCompany = false;

  constructor(
    private formBuilder: FormBuilder,
    private conveyorService: ConveyorService,
    private errorMessages: ErrorMessagesService,
  ) { }

  ngOnInit() {
    this.alertSucces = false;
    this.formBuilderInput();
    this.form.get('typeConveyorId').setValue(this.typeConveyor);

    this.conveyorService.closeModalArchiveDocumentCompany.subscribe(resp =>{
      this.openPhotoDocumentCompany = resp;
    });
    this.conveyorService.frontalArchiveDocumentCompany.subscribe(resp =>{
      this.form.get('documentCompany').setValue(resp);
    });
    this.conveyorService.addPhotoDocumentCompany.subscribe(resp =>{
      this.addDocumentCompany = true;
      this.toastMessage = 'Documento de la empresa agregado';
      const element = document.getElementById('toast-message-driver');
      element.classList.remove('hide');
    });


    this.conveyorService.closeModalArchiveIdentityCardDriver.subscribe(resp =>{
      this.openPhotoIdentityCard = resp;
    });

    this.conveyorService.frontalArchiveIdentityCardDriver.subscribe(resp =>{
      this.form.get('documentIdentityCardFrontal').setValue(resp);
    });
    this.conveyorService.backArchiveIdentityCardDriver.subscribe(resp =>{
      this.form.get('documentIdentityCardBack').setValue(resp);
    });
    this.conveyorService.removePhotoBackIdentityCardDriver.subscribe(resp =>{
      this.form.get('documentIdentityCardFrontal').setValue('');
    });
    this.conveyorService.removePhotoBackIdentityCardDriver.subscribe(resp =>{
      this.form.get('documentIdentityCardBack').setValue('');
    });
    this.conveyorService.addIdentityCardDriver.subscribe(resp =>{
      this.addIdentityCard = true;
      this.toastMessage = 'C??dula de ciudadan??a agregada';
      const element = document.getElementById('toast-message-driver');
      element.classList.remove('hide');
    });
  }

  async register(){
    if(this.form.invalid){
      return;
    }
     this.propagar.emit(true);
    await this.conveyorService.registerAdminLogistThird(this.form.value).subscribe(async resp =>{
       this.propagar.emit(false);
       this.form.reset();
       this.conveyorService.removeModalIdentityCardDriver.emit();
       this.conveyorService.removeModalPhotoDocumentCompany.emit();
       this.alertSucces = true;
       this.addIdentityCard = false;
       this.addDocumentCompany = false;
       this.alertConfirm = false;
       this.alertSucces = true;
       this.errors = [];
    }, (error) =>{
       this.propagar.emit(false);
      this.errors = this.errorMessages.parsearErroresAPI(error);
    });
  }

  removeDocumentCompany(){
    this.form.get('documentCompany').setValue('');
    this.conveyorService.removeModalPhotoDocumentCompany.emit();
    this.addDocumentCompany = false;
    this.toastMessage = 'Se elimin?? el documento de la empresa';
    const element = document.getElementById('toast-message-driver');
      element.classList.remove('hide');
  }
  removeIdentityCard(){
    this.form.get('documentIdentityCardFrontal').setValue('');
    this.form.get('documentIdentityCardBack').setValue('');
    this.conveyorService.removeModalIdentityCardDriver.emit();
    this.addIdentityCard = false;
    this.toastMessage = 'Se elimin?? la c??dula de ciudadan??a';
    const element = document.getElementById('toast-message-driver');
      element.classList.remove('hide');
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

  openModalPhotoIdentityCard(){
    this.openPhotoIdentityCard = true;
  }

  openModalPhotoDocumentCompany(){
    this.openPhotoDocumentCompany = true;
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
      documentCompany: '',
      documentIdentityCardFrontal: '',
      documentIdentityCardBack: '',

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
   FUNCI??N PARA VALIDAR LOS CAMPOS
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
          this.statusInputMessageEmail = 'Ingrese un correo electr??nico v??lido';
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
        this.statusInputMessagePhone = 'Ingrese un n??mero de celular v??lido';
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
