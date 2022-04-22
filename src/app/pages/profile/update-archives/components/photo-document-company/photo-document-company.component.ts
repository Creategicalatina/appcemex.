import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { Profile } from '../../../../../interfaces/profile/profile';
import { ProfileService } from '../../../../../services/profile/profile.service';

@Component({
  selector: 'app-photo-document-company',
  templateUrl: './photo-document-company.component.html',
  styleUrls: ['./photo-document-company.component.scss'],
})
export class PhotoDocumentCompanyComponent implements OnInit {

  @Input() modalPhotoDocumentCompanyShow: false;
  @Input() getDataUser: Profile;

  savePhotoFrontal: any;
  errors = '';
  email = '';

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  removePhotoDocumentCompanyFrontal: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  closeModalArchiveDocumentCompany: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  showLoading: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  hidenLoading: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  showAlertSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

  ngOnInit() {}

  async savePhotoDocumentCompany(){
    if(!this.savePhotoFrontal){
      return;
    }
    const data = {
      documentCompanyFrontal: this.savePhotoFrontal,
    };
    this.showLoading.emit();
    await this.profileService.updatePhotoDocumentCompany(this.getDataUser, data).subscribe(resp =>{
      this.hidenLoading.emit();
      this.closeModalArchiveDocumentCompany.emit();
      this.showAlertSuccess.emit();
      this.photoFrontal.webviewPath = '';
    }, error =>{
      this.hidenLoading.emit();
      // this.errors = this.errorMessages.parsearErroresAPI(error);
       this.errors = 'Error al actualizar la cédula de ciudadanía';
    });
  }

  async openCameraOne(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photoFrontal = {
      webviewPath: capturedPhoto.webPath
    };

    this.savePhotoFrontal = await this.convertPhotoCamera.savePicture(capturedPhoto);
  }

  closeModalDocumentCompany(){
    if(this.photoFrontal.webviewPath){
      this.closeModalArchiveDocumentCompany.emit(false);
      this.removePhotoFrontal();
      return;
    }
    this.closeModalArchiveDocumentCompany.emit(false);
    this.removePhotoFrontal();
  }
  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.removePhotoDocumentCompanyFrontal.emit();
  }

}
