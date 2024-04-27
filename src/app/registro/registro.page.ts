import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from 'src/services/utils.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  private router: Router

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  
  showPassword = false;



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);



  ngOnInit() { }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        await this.firebaseSvc.updateUser(this.form.value.name);
  
        let uid = res.user.uid;
  
        this.form.controls.uid.setValue(uid);
  
        this.setUserInfo(uid);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.utilsSvc.presentToast({
            message: 'El correo electrónico ya está registrado.',
            duration: 2500,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        } else {
          this.utilsSvc.presentToast({
            message: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }
      })
      .finally(() => {
        loading.dismiss();
      });
    }
  }
  


  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`
      delete this.form.value.password;


  
      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        this.utilsSvc.saveInLocalStorage('user', this.form.value)
        this.utilsSvc.routerLink('/home');
        this.form.reset();



      })

        .catch(error => {
          this.utilsSvc.presentToast({
            message: error.mensaje,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }



  


}
