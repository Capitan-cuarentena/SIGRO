import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/services/utils.service';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from '../models/user.model';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  showPassword = false;

  @Output() userLoggedIn: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private utilsSvc: UtilsService,
    private menu: MenuController,
    private firebaseSvc: FirebaseService,
    private toastController: ToastController
  ) {}

  ngOnInit() {    this.menu.enable(false, 'login-menu'); 
}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        const uid = res.user.uid;
        this.getUserInfo(uid);
        this.userLoggedIn.emit(); // Emitir el evento
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        let message = 'Contrasena o usuario incorrecto';
        if (error.code === 'auth/wrong-password') {
          message = 'La contraseña ingresada es incorrecta.';
        } else if (error.code === 'auth/user-not-found') {
          message = 'El usuario no existe.';
        }
        this.utilsSvc.presentToast({
          message: message,
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      })
      .finally(() => {
        loading.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`
  
      this.firebaseSvc.getDocument(path).then((user: User) => {
        this.utilsSvc.saveInLocalStorage('user', user)
        this.utilsSvc.routerLink('/home');
        this.form.reset();

        this.utilsSvc.presentToast({
          message: `¡¡Bienvenido ${user.name}!!`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        });
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
