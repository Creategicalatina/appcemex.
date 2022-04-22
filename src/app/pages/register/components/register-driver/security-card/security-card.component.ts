import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';

@Component({
  selector: 'app-security-card',
  templateUrl: './security-card.component.html',
  styleUrls: ['./security-card.component.scss'],
})
export class SecurityCardComponent implements OnInit {

  @Input() modalPhotoSecurityCardShow: false;

  savePhotoFrontal: any;

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };

  constructor(
    private conveyorService: ConveyorService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

  ngOnInit() {
    this.conveyorService.removeModalSecurityCard.subscribe(resp =>{
      this.photoFrontal.webviewPath = '';
    });
  }

  addPhotoDocumentCompany(){
    this.conveyorService.addPhotoSecurityCard.emit();
    this.conveyorService.frontalArchiveSecurityCard.emit(this.savePhotoFrontal);
    this.conveyorService.closeModalArchiveSecurityCard.emit(false);
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
    if( this.photoFrontal.webviewPath){
      this.conveyorService.closeModalArchiveSecurityCard.emit(false);
      return;
    }
   this.conveyorService.closeModalArchiveSecurityCard.emit(false);
   this.removePhotoFrontal();
 }

 removePhotoFrontal(){
   this.photoFrontal.webviewPath = '';
   this.conveyorService.removePhotoFrontalSecurityCard.emit();
 }
}
