/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { EventEmitter, Injectable, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Profile, User, UserDriverUpdatePhoto } from 'src/app/interfaces/profile/profile';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  firstName = '';
  lastName = '';
  document = '';
  token: string;
  idDriver: number;
  urlActualLicenceFrontal: string;
  urlActualLicenceBack: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() updateDataUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { this.init(); }

  async init() {
    await this.storage.create();
    await this.storage.get('current_user').then(resp =>{
      this.urlActualLicenceFrontal = resp.documentDrivinglicenseFrontal;
      this.urlActualLicenceBack = resp.documentDrivinglicenseBack;
      this.firstName = resp.user.firstName;
      this.lastName = resp.user.lastName;
      this.document = resp.user.document;
      this.idDriver = resp.idDriver;
      this.token = resp.token;
  });
  }
  public getDataUser(email: string){
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    return this.http.get<Profile>(`${URL}/api/profile/get-data-user/${email}`);
  }
  /*=============================================
    ACTUALIZAR LICENCIA DE CODUCCIÓN
  =============================================*/
   public updatePhotoLicence(user: UserDriverUpdatePhoto, data: any){
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('document', this.document);
    formData.append('urlActualLicenceFrontal', user.documentDrivinglicenseFrontal);
    formData.append('urlActualLicenceBack', user.documentDrivinglicenseBack);
    formData.append('documentDrivinglicenseFrontal', data.documentDrivinglicenseFrontal.bob, data.documentDrivinglicenseFrontal.filepath );
    formData.append('documentDrivinglicenseBack', data.documentDrivinglicenseBack.bob, data.documentDrivinglicenseBack.filepath);

    return this.http.put(`${URL}/api/profile/${user.idDriver}`, formData);
  }

  /*=============================================
    ACTUALIZAR CÉDULA DE CIUDADANÍA
  =============================================*/
  public updatePhotoIdentityCard(data: any, user: any, email: string){
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('document', user.document);
    formData.append('urlActualIdentityCardFrontal', user.documentIdentityCardFrontal);
    formData.append('urlActualIdentityCardBack', user.documentIdentityCardBack);
    formData.append('documentIdentityCardFrontal', data.documentIdentityCardFrontal.bob, data.documentIdentityCardFrontal.filepath );
    formData.append('documentIdentityCardBack', data.documentIdentityCardBack.bob, data.documentIdentityCardBack.filepath);

    return this.http.put(`${URL}/api/profile/update-photo-identity-card/${email}`, formData);
  }

  /*=============================================
    ACTUALIZAR DOCUMENTO DE LA EMPRESA
  =============================================*/
  public updatePhotoSecurityCard(user: UserDriverUpdatePhoto, data: any){
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('urlActualSecurityCard', user.documentSecurityCard);
    formData.append('documentSecurityCard', data.documentSecurityCardFrontal.bob, data.documentSecurityCardFrontal.filepath );


    return this.http.put(`${URL}/api/profile/update-photo-security-card/${user.idDriver}`, formData);
  }

  /*=============================================
    ACTUALIZAR DOCUMENTO DE LA EMPRESA
  =============================================*/
  public updatePhotoDocumentCompany(user: Profile, data: any){
    const headerToken = new HttpHeaders({
      'Authorization': this.token,
    });
    const formData = new FormData();
    formData.append('firstName', user.user.firstName);
    formData.append('lastName', user.user.lastName);
    formData.append('UrlActualDocumentCompany', user.documentCompany);
    formData.append('documentCompany', data.documentCompanyFrontal.bob, data.documentCompanyFrontal.filepath );


    return this.http.put(`${URL}/api/profile/update-photo-document-company/${user.companyId}`, formData);
  }
}
