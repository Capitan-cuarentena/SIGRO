import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';



@NgModule({
  declarations: [MenuComponent,HeaderComponent, 
    CustomInputComponent,
    
    AddUpdateProductComponent

  ],
  exports: [CustomInputComponent,ReactiveFormsModule,AddUpdateProductComponent,MenuComponent,HeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  
    FormsModule
  ]
})
export class SharedModule { }
