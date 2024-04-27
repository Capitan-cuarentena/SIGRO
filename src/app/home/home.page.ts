import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/services/firebase.service';
import { UtilsService } from 'src/services/utils.service';
import { Product } from 'src/app/models/product.model';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { User } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAdmin: boolean = false;
  products: Product[] = []; 
  filteredProducts: Product[] = [];  // Lista para mostrar después de filtrado

 
  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.verifyAdminStatus(user.uid);
      } else {
        this.isAdmin = false; 
      }
    });

    this.firebaseSvc.getCollectionData('products').subscribe((res: Product[]) => {
      this.products = res;
      this.filteredProducts = res;  
    });

  }
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();  
    if (searchTerm === '') {
      // Si la búsqueda está vacía, muestra todos los productos
      this.filteredProducts = this.products;
    } else {
      // Filtra la lista de productos por nombre
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }
  }
  user(): User {
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  getProducts() {
    let path = 'products';
    this.firebaseSvc.getCollectionData(path).subscribe((res: any) => {
      console.log(res);
      this.products = res;
    });
  } 

  async verifyAdminStatus(uid: string) {
    this.isAdmin = await this.firebaseSvc.isUserAdmin(uid);
    console.log('isAdmin:', this.isAdmin);
  }

  signOut() {
    this.firebaseSvc.singOut();
  }

  addUpdateProduct() {
    if (this.isAdmin) {
      this.utilSvc.presentModal({
        component: AddUpdateProductComponent,
        cssClass: 'add-update-modal'
      });
    } else {
      console.log('No tienes permisos para realizar esta acción.');  
    }
  }
  verDetalle(producto: Product) {
    localStorage.setItem('producto', JSON.stringify(producto));
    this.router.navigate(['/detalle-habitacion']);
  }
}
