import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ConveyorListDTO, CreateConveyorDrive, TypeConveyorListDTO } from 'src/app/interfaces/conveyor/conveyor';
import { environment } from 'src/environments/environment';
import { CreateConveyorManTruck, CreateConveyorAdminLogistThird } from '../../interfaces/conveyor/conveyor';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ConveyorService {

  listConveyors: any = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() closeModalArchiveLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() frontalArchiveLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() backArchiveLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removePhotoFrontalLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removePhotoBackLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removeModalLicenceDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() addLicenceDriver: EventEmitter<any> = new EventEmitter();


  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() closeModalArchiveIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() frontalArchiveIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() backArchiveIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removePhotoFrontalIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removePhotoBackIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removeModalIdentityCardDriver: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() addIdentityCardDriver: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() closeModalArchiveSecurityCard: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() addPhotoSecurityCard: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() frontalArchiveSecurityCard: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removePhotoFrontalSecurityCard: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removeModalSecurityCard: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() closeModalArchiveDocumentCompany: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() frontalArchiveDocumentCompany: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() addPhotoDocumentCompany: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output() removeModalPhotoDocumentCompany: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
  ) { }

  public registerManTruck(createManTruck: CreateConveyorDrive){
    const formData = this.formDataDriver(createManTruck);
    return this.http.post(`${URL}/api/conveyor/register-mantruck`, formData);
  }
  public registerAdminLogistThird(createLogistThird: CreateConveyorAdminLogistThird){
    const formData = this.formDataAdminLogistThird(createLogistThird);
    return this.http.post(`${URL}/api/conveyor/register-admin-logist-third`, formData);
  }

  public registerDriver(createDriver: CreateConveyorDrive){

     const formData =  this.formDataDriver(createDriver);

     return this.http.post(`${URL}/api/driver/register`, formData);
   }
  public getConveyors() {
    return this.http.get<ConveyorListDTO>(`${URL}/api/conveyor/list-conveyors`);
  }

  public formDataAdminLogistThird(createLogistThird: CreateConveyorAdminLogistThird){

    const photoIdentityCardFrontal: any = createLogistThird.documentIdentityCardFrontal;
    const photoIdentityCardBack: any = createLogistThird.documentIdentityCardBack;
    const photoDocumentCompany: any = createLogistThird.documentCompany;

    const formData = new FormData();

      formData.append('firstName', createLogistThird.firstName);
      formData.append('lastName', createLogistThird.lastName);
      formData.append('document', createLogistThird.document);
      formData.append('Email', createLogistThird.email);
      formData.append('phoneNumber', createLogistThird.phoneNumber);
      formData.append('role', createLogistThird.role);
      formData.append('nameCompany', createLogistThird.nameCompany);
      formData.append('nitCompany', createLogistThird.nitCompany.toString());
      formData.append('typeConveyorId', createLogistThird.typeConveyorId.toString() );
      if(photoIdentityCardFrontal && photoIdentityCardBack){
        formData.append('documentIdentityCardFrontal', photoIdentityCardFrontal.bob, photoIdentityCardFrontal.filepath );
        formData.append('documentIdentityCardBack', photoIdentityCardBack.bob, photoIdentityCardBack.filepath );
      }
      if(photoDocumentCompany){
        formData.append('documentCompany', photoDocumentCompany.bob, photoDocumentCompany.filepath );
      }

  return formData;

}

  public formDataDriver(createDriver: CreateConveyorDrive){

      const photoLicenceFrontal: any = createDriver.documentDrivinglicenseFrontal;
      const photoLicenceBack: any = createDriver.documentDrivinglicenseBack;

      const photoIdentityCardFrontal: any = createDriver.documentIdentityCardFrontal;
      const photoIdentityCardBack: any = createDriver.documentIdentityCardBack;

      const photoSecurityCard: any = createDriver.documentSecurityCard;

      const formData = new FormData();

        formData.append('firstName', createDriver.firstName);
        formData.append('lastName', createDriver.lastName);
        formData.append('document', createDriver.document);
        formData.append('Email', createDriver.email);
        formData.append('phoneNumber', createDriver.phoneNumber);
        formData.append('role', createDriver.role);
        formData.append('codeSap', createDriver.codeSap);
        if(createDriver.typeConveyorId === '3'){
          formData.append('conveyorId', createDriver.conveyorId.toString());
        }
        formData.append('typeConveyorId', createDriver.typeConveyorId.toString() );
        if(photoLicenceFrontal && photoLicenceBack){
          formData.append('documentDrivinglicenseFrontal', photoLicenceFrontal.bob, photoLicenceFrontal.filepath );
          formData.append('documentDrivinglicenseBack', photoLicenceBack.bob, photoLicenceBack.filepath );
        }
        if(photoIdentityCardFrontal && photoIdentityCardBack){
          formData.append('documentIdentityCardFrontal', photoIdentityCardFrontal.bob, photoIdentityCardFrontal.filepath );
          formData.append('documentIdentityCardBack', photoIdentityCardBack.bob, photoIdentityCardBack.filepath );
        }
        if(photoSecurityCard){
          formData.append('documentSecurityCard', photoSecurityCard.bob, photoSecurityCard.filepath );
        }

    return formData;

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async startUpload(file: any) {

    const response = await fetch(file.data);
    return  await response.blob();
}

}
