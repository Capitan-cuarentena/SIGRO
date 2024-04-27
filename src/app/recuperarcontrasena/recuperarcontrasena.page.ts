import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  formRecupera: FormGroup;
  constructor(private alertController: AlertController,private router: Router) { 
    this.formRecupera = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  ngOnInit() {
  }

  //Metodo para enviar contrasena
  async enviarContrasena() {
    if (this.formRecupera.valid) {
   
      const alert = await this.alertController.create({
        header: 'Correo Enviado',
        message: 'Se ha enviado un correo electrónico para restablecer tu contraseña.',
        buttons: ['OK']
      });

      await alert.present();
      
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El formulario no es válido. Por favor verifica la información ingresada.',
        buttons: ['Entendido']
      });

      await alert.present();
    }
  }


  get isEmailValid() {
    return this.formRecupera.get('email')!.valid;
  }



}