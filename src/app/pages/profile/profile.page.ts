/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user/user';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  public user: User = {
    firstName: '',
    lastName: '',
    document: '',
    email: '',
    status: false,
    slug: '',
    phoneNumber: '',
    roles: '',
    driver: {
      documentDrivinglicenseFrontal: '',
      documentDrivinglicenseBack: '',
      codeSap: ''
    },
    company: {
      companyNit: '',
      companyName: '',
      documentCompany: ''
    }
  };
  showModalArchiveDocumentCompany = false;
  showModalIndentityCard = false;
  showModalLicence = false;
  showModalSecurityCardApp = false;
  titleSubs: Subscription;
  loading = false;
  constructor(
    private storage: Storage,
    private profileService: ProfileService,
    private router: Router
  ) {

    this.titleSubs = this.getTitleRuote().subscribe(event =>{
       if(event === '/app/profile'){
         this.getDataUserProfile();
       }
    });
  }

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  async ngOnInit() {
    await this.storage.get('current_user').then(resp =>{
      console.log(resp);
      this.user.email = resp.user.email;
    });
    this.getDataUserProfile();
  }
  getTitleRuote() {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot['_routerState'].url),
      );
  }
  async getDataUserProfile(){
    let urlactual = '';
    this.loading = true;
    await this.profileService.getDataUser(this.user.email).subscribe(async resp=>{
      const rol =  resp.roles.map(item =>  item);
      this.user.firstName = resp.user.firstName;
      this.user.lastName = resp.user.lastName;
      this.user.document = resp.user.document;
      this.user.roles = rol.toString();
      this.user.documentIdentityCardFrontal = resp.user.documentIdentityCardFrontal;
      this.user.documentIdentityCardBack = resp.user.documentIdentityCardBack;

      this.user.driver.codeSap = resp.codeSap;
      this.user.driver.documentDrivinglicenseFrontal = resp.documentDrivinglicenseFrontal;
      this.user.driver.documentDrivinglicenseBack = resp.documentDrivinglicenseBack;
      this.user.driver.documentSecurityCard = resp.documentSecurityCard;

      this.user.company.companyName = resp.companyName;
      this.user.company.documentCompany = resp.documentCompany;

      this.loading = false;
   }, error =>{
      this.loading = false;
   });
      urlactual = this.user.driver.documentDrivinglicenseFrontal;
  }

  showModalIndentity(){
    if(this.user.documentIdentityCardFrontal || this.user.documentIdentityCardBack){
      this.showModalIndentityCard = true;
    }
  }
  showModalDocumentCompany(){
    if(this.user.company.documentCompany){
      this.showModalArchiveDocumentCompany = true;
    }
  }
  showModalDrivingLicence(){
     if(this.user.driver.documentDrivinglicenseFrontal || this.user.driver.documentDrivinglicenseBack){
         this.showModalLicence = true;
       }
  }
  showModalSecurityCard(){
    if(this.user.driver.documentSecurityCard){
        this.showModalSecurityCardApp = true;
      }
 }
  closeModalIdentity(){
    this.showModalIndentityCard = false;
  }
  closeModalLicence(){
    this.showModalLicence = false;
  }
  closeModalDocumentCompany(){
    this.showModalArchiveDocumentCompany = false;
  }
  closeModalSecurityCard(){
    this.showModalSecurityCardApp = false;
  }

}
