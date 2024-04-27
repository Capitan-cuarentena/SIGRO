import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  private router: Router

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required,]),
    name: new FormControl('', [Validators.required,]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    tipo: new FormControl('', [Validators.required,]),
    capacidad: new FormControl('', [Validators.required, Validators.min(0)]),
    descripcion: new FormControl('', [Validators.required,]),
  })

  showPassword = false;



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user= {} as User;


  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() { 

    this.user = this.utilsSvc.getFromLocalStorage('user');

  }

  async takeImage(){
    const dataUrl= (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
    this.form.controls.image.setValue(dataUrl)

  }




  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
  
      try {
        await loading.present();
  
        const dataUrl = this.form.value.image;
        const imagePath = `${Date.now()}`;
        const imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
  
        this.form.controls.image.setValue(imageUrl);
        delete this.form.value.id;
  
        // Guardar el producto en la colección global de productos
        const path = 'products';
        await this.firebaseSvc.addDocument(path, this.form.value);
  
        this.utilsSvc.dismissModal({ success: true });
  
        this.utilsSvc.presentToast({
          message: 'Habitación agregada correctamente.',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        });
      } catch (error) {
        console.error(error);
  
        this.utilsSvc.presentToast({
          message: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      } finally {
        loading.dismiss();
      }
    }
  }
  
  
  




  


}
