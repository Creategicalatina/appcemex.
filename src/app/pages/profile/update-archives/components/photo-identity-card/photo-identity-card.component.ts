import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserUpdatePhoto } from '../../../../../interfaces/profile/profile';

@Component({
  selector: 'app-photo-identity-card',
  templateUrl: './photo-identity-card.component.html',
  styleUrls: ['./photo-identity-card.component.scss'],
})
export class PhotoIdentityCardComponent implements OnInit {

  @Input() modalPhotoIdentityCardShow: false;
  savePhotoFrontal: any;
  savePhotoBack: any;
  errors = '';
  email = '';
  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };
  public photoBack: PhotoCamera = {
    webviewPath: ''
  };
  public user: UserUpdatePhoto = {
    firstName: '',
    lastName: '',
    document: '',
    email: '',
    documentIdentityCardFrontal: '',
    documentIdentityCardBack: ''
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  removePhotoIdentityCardFrontal: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  removePhotoIdentityCardBack: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  closeModalArchiveIdentityCard: EventEmitter<any> = new EventEmitter();

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
    private storage: Storage,
    private profileService: ProfileService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

 async ngOnInit() {
    await this.storage.create();
    await this.storage.get('current_user').then(resp =>{
      this.email = resp.user.email;
  });
    this.profileService.getDataUser(this.email).subscribe(resp => {
       this.user.firstName = resp.user.firstName;
       this.user.lastName = resp.user.lastName;
       this.user.document = resp.user.document;
       this.user.documentIdentityCardFrontal = resp.user.documentIdentityCardFrontal;
       this.user.documentIdentityCardBack = resp.user.documentIdentityCardBack;
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

    this.savePhotoBack = await this.convertPhotoCamera.savePicture(capturedPhoto);
  }

  async savePhotoIdentityCard(){
    if(!this.savePhotoFrontal || !this.savePhotoBack){
      return;
    }
    const data = {
      documentIdentityCardFrontal: this.savePhotoFrontal,
      documentIdentityCardBack: this.savePhotoBack,
    };
    this.showLoading.emit();
    await this.profileService.updatePhotoIdentityCard(data, this.user, this.email).subscribe(resp =>{
      this.hidenLoading.emit();
      this.closeModalArchiveIdentityCard.emit();
      this.showAlertSuccess.emit();
      this.photoFrontal.webviewPath = '';
      this.photoBack.webviewPath = '';
    }, error =>{
      this.hidenLoading.emit();
      // this.errors = this.errorMessages.parsearErroresAPI(error);
       this.errors = 'Error al actualizar la cédula de ciudadanía';
    });
  }

  closeModalIdentityCard(){
    if(this.photoBack.webviewPath && this.photoFrontal.webviewPath){
      this.closeModalArchiveIdentityCard.emit(false);
      this.removePhotoFrontal();
      this.removePhotoBack();
      return;
    }
    this.closeModalArchiveIdentityCard.emit(false);
    this.removePhotoFrontal();
    this.removePhotoBack();
  }
  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.removePhotoIdentityCardFrontal.emit();
  }
  removePhotoBack(){
    this.photoBack.webviewPath = '';
    this.removePhotoIdentityCardBack.emit();
  }
}
