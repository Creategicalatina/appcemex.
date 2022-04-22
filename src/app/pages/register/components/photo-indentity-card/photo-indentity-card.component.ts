import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';

@Component({
  selector: 'app-photo-indentity-card',
  templateUrl: './photo-indentity-card.component.html',
  styleUrls: ['./photo-indentity-card.component.scss'],
})
export class PhotoIndentityCardComponent implements OnInit {

  @Input() modalPhotoIdentityCardShow: false;

  savePhotoFrontal: any;
  savePhotoBack: any;

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };
  public photoBack: PhotoCamera = {
    webviewPath: ''
  };
  constructor(
    private conveyorService: ConveyorService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

  ngOnInit() {
    this.conveyorService.removeModalIdentityCardDriver.subscribe(resp =>{
      this.photoFrontal.webviewPath = '';
      this.photoBack.webviewPath = '';
    });
  }

  addIdentityCard(){
    this.conveyorService.addIdentityCardDriver.emit();
    this.conveyorService.frontalArchiveIdentityCardDriver.emit(this.savePhotoFrontal);
    this.conveyorService.backArchiveIdentityCardDriver.emit(this.savePhotoBack);
    this.conveyorService.closeModalArchiveIdentityCardDriver.emit(false);
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

  closeModalIdentityCard(){
    if(this.photoBack.webviewPath && this.photoFrontal.webviewPath){
      this.conveyorService.closeModalArchiveIdentityCardDriver.emit(false);
      return;
    }
    this.conveyorService.closeModalArchiveIdentityCardDriver.emit(false);
    this.removePhotoFrontal();
    this.removePhotoBack();
  }

  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.conveyorService.removePhotoFrontalIdentityCardDriver.emit();
  }
  removePhotoBack(){
    this.photoBack.webviewPath = '';
    this.conveyorService.removePhotoBackIdentityCardDriver.emit();
  }

}
