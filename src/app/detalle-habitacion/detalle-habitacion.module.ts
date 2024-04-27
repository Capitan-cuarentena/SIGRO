import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { DetalleHabitacionPageRoutingModule } from './detalle-habitacion-routing.module';

import { DetalleHabitacionPage } from './detalle-habitacion.page';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DetalleHabitacionPageRoutingModule,
    IonicModule,
    SharedModule
  ],
  declarations: [DetalleHabitacionPage]
})
export class DetalleHabitacionPageModule {}
 