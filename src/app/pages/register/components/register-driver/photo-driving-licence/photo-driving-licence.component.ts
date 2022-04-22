import { Platform } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';

@Component({
  selector: 'app-photo-driving-licence',
  templateUrl: './photo-driving-licence.component.html',
  styleUrls: ['./photo-driving-licence.component.scss'],
})
export class PhotoDrivingLicenceComponent implements OnInit {

  @Input() modalPhotoLinceShow: false;

  savePhotoFrontal: any;
  savePhotoBack: any;

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };
  public photoBack: PhotoCamera = {
    webviewPath: ''
  };

  imagenBase64: string;

  private platform: Platform;
  constructor(
    private conveyorService: ConveyorService,
    public convertPhotoCamera: ConvertPhotoCameraService,
    platform: Platform
  ) {
    this.platform = platform;
  }

  ngOnInit() {
    this.conveyorService.removeModalLicenceDriver.subscribe(resp =>{
      this.photoFrontal.webviewPath = '';
      this.photoBack.webviewPath = '';
    });
  }

  addLicence(){
    this.conveyorService.addLicenceDriver.emit();
    this.conveyorService.frontalArchiveLicenceDriver.emit(this.savePhotoFrontal);
    this.conveyorService.backArchiveLicenceDriver.emit(this.savePhotoBack);
    this.conveyorService.closeModalArchiveLicenceDriver.emit(false);
  }

  closeModalLicence(){
    if(this.photoBack.webviewPath && this.photoFrontal.webviewPath){
      this.conveyorService.closeModalArchiveLicenceDriver.emit(false);
      return;
    }
    this.conveyorService.closeModalArchiveLicenceDriver.emit(false);
    this.removePhotoFrontal();
    this.removePhotoBack();
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

  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.conveyorService.removePhotoFrontalLicenceDriver.emit();
  }
  removePhotoBack(){
    this.photoBack.webviewPath = '';
    this.conveyorService.removePhotoBackLicenceDriver.emit();
  }
}
