import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConvertPhotoCameraService {

  constructor(
    private platform: Platform
  ) { }

  async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.' + photo.format;

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    const photoResul = {
      filepath: fileName,
      data: base64Data,
      webviewPath: photo.webPath
    };

    const response = await fetch(photoResul.data);
    const resultBob = await response.blob();

    const sendPhoto = {
      filepath: fileName,
      data: base64Data,
      bob: resultBob,
      webviewPath: photo.webPath
    };

    return sendPhoto;
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
