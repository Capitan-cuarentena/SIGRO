import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';

import { HistorialPage } from './historial.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    HistorialPageRoutingModule
  ],
  declarations: [HistorialPage]
})
export class HistorialPageModule {}
