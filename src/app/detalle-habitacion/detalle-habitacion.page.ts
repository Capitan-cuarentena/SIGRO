import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FirebaseService } from 'src/services/firebase.service';
import { IonMenu, ToastController } from '@ionic/angular';
import { filter, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-detalle-habitacion',
  templateUrl: './detalle-habitacion.page.html',
  styleUrls: ['./detalle-habitacion.page.scss'],
})
export class DetalleHabitacionPage implements OnInit {
  producto: Product;
  fechaInicio: string;
  fechaFin: string;
  userId: string;
  products: Product[] = []; 
  reservas: any[];

  constructor(
    private route: ActivatedRoute,
    private firebaseSvc: FirebaseService,
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.producto = JSON.parse(localStorage.getItem('producto'));
    this.getUserId();
    this.firebaseSvc.getAllReservas().subscribe(reservas => {
      this.reservas = reservas;
    });
  }

  signOut() {
    this.firebaseSvc.singOut();
  }

  async getUserId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.auth.authState.pipe(
        take(1)
      ).subscribe(user => {
        if (user) {
          resolve(user.uid);
        } else {
          reject('No se pudo obtener el ID de usuario');
        }
      });
    });
  }

  async guardarReserva() {
    if (!this.fechaInicio || !this.fechaFin) {
      console.error('Las fechas no pueden estar vacías');
      return;
    }
  
    try {
      const userId = await this.getUserId();
      const reservas = await this.firebaseSvc.getAllReservas().pipe(take(1)).toPromise();
      const reservasCoincidentes = reservas.filter(reserva =>
        reserva.productoId === this.producto.id &&
        this.obtenerFecha(reserva.fechaInicio) <= this.obtenerFecha(this.fechaFin) &&
        this.obtenerFecha(reserva.fechaFin) >= this.obtenerFecha(this.fechaInicio)
      );
  
      if (reservasCoincidentes.length > 0) {
        this.mostrarToast('La habitación está ocupada en las fechas seleccionadas');
        return;
      }
  
      const reserva = {
        productoId: this.producto.id,
        productName: this.producto.name, 
        fechaInicio: this.obtenerFecha(this.fechaInicio),
        fechaFin: this.obtenerFecha(this.fechaFin),
      };
  
      console.log('Datos de la reserva:', reserva);
  
      try {
        this.firebaseSvc.addDocument('reservas', reserva)
          .then(() => {
            this.mostrarToast('La reserva se ha guardado correctamente');
          })
          .catch(error => console.error('Error al guardar la reserva:', error));
      } catch (error) {
        console.error('Error al guardar la reserva:', error);
      }
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
    }
  }
  
  obtenerFecha(fecha: string): string {
    return fecha.split('T')[0];
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  getProducts() {
    let path = 'products';
    this.firebaseSvc.getCollectionData(path).subscribe((res: any) => {
      console.log(res);
      this.products = res;
    });
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }


}

