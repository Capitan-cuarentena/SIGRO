import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
