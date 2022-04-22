import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { debounceTime } from 'rxjs/operators';
import { ProfileService } from '../../../services/profile/profile.service';
import { Profile } from '../../../interfaces/profile/profile';

@Component({
  selector: 'app-update-archives',
  templateUrl: './update-archives.page.html',
  styleUrls: ['./update-archives.page.scss'],
})
export class UpdateArchivesPage implements OnInit {

  formTypeArchive: FormGroup;
  rol = '';
  email = '';
  loading = false;
  alertSucces = false;
  showFormLicence = false;
  showFormDocumentCompany = false;
  showFormIdentityCard = false;
  showFormCardSecurity = false;
  openPhotoDrivingLicence = false;
  openPhotoIdentityCard = false;
  openPhotoDocumentCompany = false;
  openPhotoSecurityCard = false;
  user: Profile = {
    user: {
      firstName: '',
      lastName: '',
      email: ''
    },
    idDriver: null,
    companyId: null,
    companyName: '',
    documentCompany: ''
  };
  constructor(
    private storage: Storage,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    this.formBuilderInput();
    await this.storage.get('current_user').then(resp =>{
      console.log(resp);
      this.email = resp.user.email;
    });
    this.getDataUserProfile();
  }

  async getDataUserProfile(){

    this.loading = true;
    await this.profileService.getDataUser(this.email).subscribe(async resp=>{

      this.rol =  resp.roles.map(item =>  item).toString();
      this.user.user.firstName = resp.user.firstName;
      this.user.user.email = resp.user.email;
      this.user.user.lastName = resp.user.lastName;
      this.user.companyId = resp.companyId;
      this.user.companyName = resp.companyName;
      this.user.documentCompany = resp.documentCompany;

      this.loading = false;
   }, error =>{
      this.loading = false;
   });
  }
  formBuilderInput(){
    this.formTypeArchive = this.formBuilder.group({
      typeArchive: ['', [
        Validators.required,
      ]],
    });
    this.formTypeArchive.valueChanges
    .pipe(
      debounceTime(100),
    )
    .subscribe(data => {
    });
  }
  /*=============================================
  FUNCIONES PARA EL ARCHIVO DE LA EMPRESA
=============================================*/
openModalDocumentCompany(){
  this.openPhotoDocumentCompany = true;
}
closeModalDocumentCompany(){
  this.openPhotoDocumentCompany = false;
}
/*=============================================
  FUNCIONES PARA LINCENCIA DE CONDUCCIÓN
=============================================*/
  openModalPhotoLicence(){
    this.openPhotoDrivingLicence = true;
  }
  closeModalLicence(){
    this.openPhotoDrivingLicence = false;
  }
/*=============================================
  FUNCIONES PARA LA CÉDULA DE CIUDADANÍA
=============================================*/
openModalPhotoIdentityCard(){
  this.openPhotoIdentityCard = true;
}
closeModalIdentityCard(){
  this.openPhotoIdentityCard = false;
}

/*=============================================
  FUNCIONES PARA EL CARNE DE SEGURIDAD
=============================================*/
openModalPhotoSecurityCard(){
  this.openPhotoSecurityCard = true;
}
closeModalSecurityCard(){
  this.openPhotoSecurityCard = false;
}
  showAlertSuccess(){
    this.alertSucces = true;
  }
  showLoading(){
    this.loading = true;
  }
  hidenLoading(){
    this.loading = false;
  }

  cwcChange(data){
    if(data){
      if(data.detail === '1'){
        this.showFormCardSecurity = false;
        this.showFormDocumentCompany = false;
        this.showFormIdentityCard = false;
        this.showFormLicence = true;
      }else if(data.detail === '2'){
        this.showFormLicence = false;
        this.showFormDocumentCompany = false;
        this.showFormIdentityCard = false;
        this.showFormCardSecurity = true;
      }else if(data.detail === '3'){
        this.showFormLicence = false;
        this.showFormDocumentCompany = false;
        this.showFormCardSecurity = false;
        this.showFormIdentityCard = true;
      }else if(data.detail === '4'){
        this.showFormLicence = false;
        this.showFormCardSecurity = false;
        this.showFormIdentityCard = false;
        this.showFormDocumentCompany = true;
      }
    }
  }
}
