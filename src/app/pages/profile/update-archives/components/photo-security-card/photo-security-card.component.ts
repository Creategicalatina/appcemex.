import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { UserDriverUpdatePhoto } from 'src/app/interfaces/profile/profile';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-photo-security-card',
  templateUrl: './photo-security-card.component.html',
  styleUrls: ['./photo-security-card.component.scss'],
})
export class PhotoSecurityCardComponent implements OnInit {

  @Input() modalPhotoSecurityCardShow: false;
  @Input() email: '';
  savePhotoFrontal: any;
  errors = '';
  public photoFrontal: PhotoCamera = {
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
  removePhotoSecurityCard: EventEmitter<any> = new EventEmitter();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Output()
  closeModalArchiveSecurityCard: EventEmitter<any> = new EventEmitter();

   // eslint-disable-next-line @typescript-eslint/member-ordering
   @Output()
   showLoading: EventEmitter<any> = new EventEmitter();

   // eslint-disable-next-line @typescript-eslint/member-ordering
   @Output()
   hidenLoading: EventEmitter<any> = new EventEmitter();

   // eslint-disable-next-line @typescript-eslint/member-ordering
   @Output()
   showAlertSuccess: EventEmitter<any> = new EventEmitter()

  constructor(
    private profileService: ProfileService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

  async ngOnInit() {
    await this.profileService.getDataUser(this.email).subscribe(resp => {
      this.user.idDriver = resp.idDriver;
      this.user.firstName = resp.user.firstName;
      this.user.lastName = resp.user.lastName;
      this.user.documentSecurityCard = resp.documentSecurityCard;
   });
  }

  async savePhotoSecurityCard(){
    if(!this.savePhotoFrontal){
      return;
    }
    const data = {
      documentSecurityCardFrontal: this.savePhotoFrontal,
    };
    this.showLoading.emit();
    await this.profileService.updatePhotoSecurityCard(this.user, data).subscribe(resp =>{
      this.hidenLoading.emit();
      this.closeModalArchiveSecurityCard.emit();
      this.showAlertSuccess.emit();
      this.photoFrontal = {
        webviewPath:''
      };
    }, error =>{
      this.hidenLoading.emit();
      // this.errors = this.errorMessages.parsearErroresAPI(error);
       this.errors = 'Error al actualizar la licencia de conducción';
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

  closeModalSecurityCard(){
    if(this.photoFrontal.webviewPath){
      this.closeModalArchiveSecurityCard.emit(false);
      this.removePhotoFrontal();
      return;
    }
    this.closeModalArchiveSecurityCard.emit(false);
    this.removePhotoFrontal();
  }

  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.removePhotoSecurityCard.emit();
  }

}
