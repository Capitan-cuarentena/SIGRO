import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';


import { RegistroPage } from './registro.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    RegistroPageRoutingModule,
    SharedModule
  ],
  declarations: [RegistroPage],
  providers: []  
})
export class RegistroPageModule {}
