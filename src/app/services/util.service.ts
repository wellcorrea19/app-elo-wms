import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

     // authenticationState = new BehaviorSubject(false);

     constructor(
      private toast: ToastController,
      private sanitize: DomSanitizer,
      private alert: AlertController,
      private storage: Storage,
      private plt: Platform
  ){
  }

// Formatação autenticação de usuario e token

  public async PresentToast(message, position) {
      const toastcrl = await this.toast.create({
        message,
        position,
        color: 'danger',
        buttons: ['OK'],
      });
      return toastcrl.present();
  }
  public ShowLog(text, values) {
      console.log(text, values);
  }

  public SanitizeImage(imagePath) {
      return this.sanitize.bypassSecurityTrustStyle(`url('${imagePath}')`);
  }

  public async ShowAlert(message) {
      alert(message);
  }

  public SetStorage(key, value) {
      this.storage.set(key, value);
  }

  public GetStorage(key) {
      return this.storage.get(key);
  }

  public ClearStorage() {
      this.storage.clear();
  }
}
