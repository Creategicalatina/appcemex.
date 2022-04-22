import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserDriverUpdatePhoto } from '../../../../../interfaces/profile/profile';

@Component({
  selector: 'app-photo-licence-document',
  templateUrl: './photo-licence-document.component.html',
  styleUrls: ['./photo-licence-document.component.scss'],
})
export class PhotoLicenceDocumentComponent implements OnInit {

  @Input() modalPhotoLinceShow: false;
  @Input() email: '';
  savePhotoFrontal: any;
  savePhotoBack: any;
  errors = '';

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };
  public photoBack: PhotoCamera = {
    webviewPath: ''
  };
  public user: UserDriverUpdatePhoto = {
    idDriver: null,
    firstName: '',
    lastName: '',
    document: '',
    email: '',
    documentDrivinglicenseFrontal: '',
    documentDrivinglicenseBack: ''
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  removePhotoLicenceFrontal: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  removePhotoLicenceBack: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  closeModalArchiveLicence: EventEmitter<any> = new EventEmitter();

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

  ngOnInit() {
    this.profileService.getDataUser(this.email).subscribe(resp => {
      this.user.idDriver = resp.idDriver;
      this.user.firstName = resp.user.firstName;
      this.user.lastName = resp.user.lastName;
      this.user.documentDrivinglicenseFrontal = resp.documentDrivinglicenseFrontal;
      this.user.documentDrivinglicenseBack = resp.documentDrivinglicenseBack;
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

  async openCameraTwo(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photoBack = {
      webviewPath: capturedPhoto.webPath
    };
    this.errors = '';
    this.savePhotoBack = await this.convertPhotoCamera.savePicture(capturedPhoto);
  }

  async savePhotoLicence(){
    if(!this.savePhotoFrontal || !this.savePhotoBack){
      return;
    }
    const data = {
      documentDrivinglicenseFrontal: this.savePhotoFrontal,
      documentDrivinglicenseBack: this.savePhotoBack,
    };
    this.showLoading.emit();
    await this.profileService.updatePhotoLicence(this.user, data).subscribe(resp =>{
      this.hidenLoading.emit();
      this.closeModalArchiveLicence.emit();
      this.showAlertSuccess.emit();
      this.photoFrontal = {
        webviewPath:''
      };
      this.photoBack = {
        webviewPath: ''
      };
    }, error =>{
      this.hidenLoading.emit();
      // this.errors = this.errorMessages.parsearErroresAPI(error);
       this.errors = 'Error al actualizar la licencia de conducción';
    });
  }

  closeModalLicence(){
    if(this.photoBack.webviewPath && this.photoFrontal.webviewPath){
      this.closeModalArchiveLicence.emit(false);
      this.removePhotoFrontal();
      this.removePhotoBack();
      return;
    }
    this.closeModalArchiveLicence.emit(false);
    this.removePhotoFrontal();
    this.removePhotoBack();
  }

  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.removePhotoLicenceFrontal.emit();
  }
  removePhotoBack(){
    this.photoBack.webviewPath = '';
    this.removePhotoLicenceBack.emit();
  }

}
