import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoCamera } from 'src/app/interfaces/photoCamera/photoCamera';
import { ConvertPhotoCameraService } from 'src/app/services/convert-photo-camera/convert-photo-camera.service';
import { ConveyorService } from 'src/app/services/conveyor/conveyor.service';

@Component({
  selector: 'app-document-company',
  templateUrl: './document-company.component.html',
  styleUrls: ['./document-company.component.scss'],
})
export class DocumentCompanyComponent implements OnInit {

  @Input() modalPhotoDocumentCompanyShow: false;
  savePhotoFrontal: any;

  public photoFrontal: PhotoCamera = {
    webviewPath: ''
  };
  constructor(
    private conveyorService: ConveyorService,
    public convertPhotoCamera: ConvertPhotoCameraService,
  ) { }

  ngOnInit() {
    this.conveyorService.removeModalPhotoDocumentCompany.subscribe(resp =>{
      this.photoFrontal.webviewPath = '';
    });
  }

  addPhotoDocumentCompany(){
    this.conveyorService.addPhotoDocumentCompany.emit();
    this.conveyorService.frontalArchiveDocumentCompany.emit(this.savePhotoFrontal);
    this.conveyorService.closeModalArchiveDocumentCompany.emit(false);
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
     if( this.photoFrontal.webviewPath){
       this.conveyorService.closeModalArchiveDocumentCompany.emit(false);
       return;
     }
    this.conveyorService.closeModalArchiveDocumentCompany.emit(false);
    this.removePhotoFrontal();
  }

  removePhotoFrontal(){
    this.photoFrontal.webviewPath = '';
    this.conveyorService.removePhotoFrontalIdentityCardDriver.emit();
  }
}
