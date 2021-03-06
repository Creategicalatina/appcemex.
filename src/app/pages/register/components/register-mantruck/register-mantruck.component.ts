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
  addLicence = false;
  addSecurityCard = false;
  addIdentityCard = false;
  toastMessage = '';

  openPhotoDrivingLicence = false;
  openPhotoIdentityCard = false;
  openPhotoSecurityCard = false;

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

    this.conveyorService.closeModalArchiveSecurityCard.subscribe(resp =>{
      this.openPhotoSecurityCard = resp;
    });
    this.conveyorService.frontalArchiveSecurityCard.subscribe(resp =>{
      this.form.get('documentSecurityCard').setValue(resp);
    });
    this.conveyorService.removePhotoFrontalSecurityCard.subscribe(resp =>{
      this.form.get('documentSecurityCard').setValue('');
    });
    this.conveyorService.addPhotoSecurityCard.subscribe(resp =>{
      this.addSecurityCard = true;
      this.toastMessage = 'Carn?? de seguridad agregado';
      const element = document.getElementById('toast-message-driver');
      element.classList.remove('hide');
    });


    this.conveyorService.closeModalArchiveLicenceDriver.subscribe(resp =>{
      this.openPhotoDrivingLicence = resp;
    });
    this.conveyorService.frontalArchiveLicenceDriver.subscribe(resp =>{
      this.form.get('documentDrivinglicenseFrontal').setValue(resp);
    });
    this.conveyorService.backArchiveLicenceDriver.subscribe(resp =>{
      this.form.get('documentDrivinglicenseBack').setValue(resp);
    });
    this.conveyorService.removePhotoFrontalLicenceDriver.subscribe(resp =>{
      this.form.get('documentDrivinglicenseFrontal').setValue('');
    });
    this.conveyorService.removePhotoBackLicenceDriver.subscribe(resp =>{
      this.form.get('documentDrivinglicenseBack').setValue('');
    });
    this.conveyorService.addLicenceDriver.subscribe(resp =>{
      this.addLicence = true;
      this.toastMessage = 'Licencia de conducci??n agregada';
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
    await this.conveyorService.registerManTruck(this.form.value).subscribe(async resp =>{
      this.propagar.emit(false);
      this.form.reset();
      this.conveyorService.removeModalLicenceDriver.emit();
      this.conveyorService.removeModalIdentityCardDriver.emit();
      this.conveyorService.removeModalSecurityCard.emit();
      this.alertSucces = true;
      this.addLicence = false;
      this.addIdentityCard = false;
      this.addSecurityCard = false;
      this.alertConfirm = false;
      this.alertSucces = true;
      this.errors = [];
    }, (error) =>{
      this.propagar.emit(false);
      this.errors = this.errorMessages.parsearErroresAPI(error);
    });
  }

  removeLicence(){
    this.form.get('documentDrivinglicenseFrontal').setValue('');
    this.form.get('documentDrivinglicenseBack').setValue('');
    this.conveyorService.removeModalLicenceDriver.emit();
    this.addLicence = false;
    this.toastMessage = 'Se elimin?? la licencia de conducci??n';
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
  removeSecurityCard(){
    this.form.get('documentSecurityCard').setValue('');
    this.conveyorService.removeModalSecurityCard.emit();
    this.addSecurityCard = false;
    this.toastMessage = 'Se elimin?? el carn?? de seguridad';
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

  openModalPhotoLicence(){
    this.openPhotoDrivingLicence = true;
  }

  openModalPhotoSecurityCard(){
    this.openPhotoSecurityCard = true;
  }

  openModalPhotoIdentityCard(){
    this.openPhotoIdentityCard = true;
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
      documentSecurityCard: '',
      documentDrivinglicenseFrontal: '',
      documentDrivinglicenseBack: '',
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
        this.statusInputMessagePhone = 'Ingrese un n??mero de celular v??lido';
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
