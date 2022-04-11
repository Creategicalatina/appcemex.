import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ConveyorListDTO, CreateConveyorDrive, TypeConveyorListDTO } from 'src/app/interfaces/conveyor/conveyor';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient,
  ) { }

  public registerManTruck(data: any){
    return this.http.post(`${URL}/api/conveyor/register-mantruck`, data);
  }
  public registerAdminLogistThird(data: any){
    return this.http.post(`${URL}/api/conveyor/register-admin-logist-third`, data);
  }
  //  public registerDriver(data: any){
  //    console.log(data);
  //    return this.http.post(`${URL}/api/driver/register`, data);
  //  }
   public registerDriver(createDriver: CreateConveyorDrive){

     const formData =  this.formDataDriver(createDriver);

     return this.http.post(`${URL}/api/driver/register`, formData);
   }
  public getConveyors() {
    return this.http.get<ConveyorListDTO>(`${URL}/api/conveyor/list-conveyors`);
  }

  public formDataDriver(createDriver: CreateConveyorDrive){

      const photoLicenceFrontal: any = createDriver.documentDrivinglicenseFrontal;
      const photoLicenceBack: any = createDriver.documentDrivinglicenseBack;

      const photoIdentityCardFrontal: any = createDriver.documentIdentityCardFrontal;
      const photoIdentityCardBack: any = createDriver.documentIdentityCardBack;
      console.log(photoLicenceFrontal);
      console.log(photoIdentityCardFrontal);

      const formData = new FormData();

        formData.append('firstName', createDriver.firstName);
        formData.append('lastName', createDriver.lastName);
        formData.append('document', createDriver.document);
        formData.append('Email', createDriver.email);
        formData.append('phoneNumber', createDriver.phoneNumber);
        formData.append('role', createDriver.role);
        formData.append('codeSap', createDriver.codeSap);
        formData.append('conveyorId', createDriver.conveyorId.toString());
        formData.append('typeConveyorId', createDriver.typeConveyorId.toString() );
        formData.append('documentDrivinglicenseFrontal', photoLicenceFrontal.bob, photoLicenceFrontal.filepath );
        formData.append('documentDrivinglicenseBack', photoLicenceBack.bob, photoLicenceBack.filepath );
        formData.append('documentIdentityCardFrontal', photoIdentityCardFrontal.bob, photoIdentityCardFrontal.filepath );
        formData.append('documentIdentityCardBack', photoIdentityCardBack.bob, photoIdentityCardBack.filepath );

    return formData;

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async startUpload(file: any) {

    const response = await fetch(file.data);
    return  await response.blob();
}

}
