import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  

  async takePicture(promptLabelHeader:string) {
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona las imagenes',
    promptLabelPicture: 'Tomar una foto'
  });

};



  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }


  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getFromLocalStorage(key: string) {

    return JSON.parse(localStorage.getItem(key))
  }


  
async presentModal (opts: ModalOptions) {
  const modal = await this.modalCtrl.create(opts); 
  await modal.present();
  const { data } = await modal.onWillDismiss(); 
  if(data) return data;
  
}

 dismissModal (data?: any) {
  return this.modalCtrl.dismiss(data);
}

}