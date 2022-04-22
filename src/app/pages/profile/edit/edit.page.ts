import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/interfaces/user/user';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  loading = false;
  rol = '';
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

  constructor(
    private storage: Storage,
    private profileService: ProfileService,
  ) { }

  async ngOnInit() {
    await this.storage.get('current_user').then(resp =>{
      this.user.email = resp.user.email;
    });
    this.getDataUserProfile();
  }

  async getDataUserProfile(){
    let urlactual = '';
    this.loading = true;
    await this.profileService.getDataUser(this.user.email).subscribe(async resp=>{
      this.rol =  resp.roles.map(item =>  item).toString();
      this.user.firstName = resp.user.firstName;
      this.user.lastName = resp.user.lastName;
      this.user.phoneNumber = resp.user.phoneNumber;
      this.user.document = resp.user.document;
      this.user.documentIdentityCardFrontal = resp.user.documentIdentityCardFrontal;
      this.user.documentIdentityCardBack = resp.user.documentIdentityCardBack;

      this.user.driver.codeSap = resp.codeSap;
      this.user.driver.documentDrivinglicenseFrontal = resp.documentDrivinglicenseFrontal;
      this.user.driver.documentDrivinglicenseBack = resp.documentDrivinglicenseBack;
      this.user.driver.documentSecurityCard = resp.documentSecurityCard;

      this.user.company.companyName = resp.companyName;
      this.user.company.documentCompany = resp.documentCompany;
      this.user.company.companyNit = resp.companyNit;

      this.loading = false;
   }, error =>{
      this.loading = false;
   });
      urlactual = this.user.driver.documentDrivinglicenseFrontal;
  }

}
