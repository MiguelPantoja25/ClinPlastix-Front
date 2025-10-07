import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
//import { MatCard, MatCardTitle } from "@angular/material/card";

import { MatCardModule } from "@angular/material/card"; //mat-card
import { MatFormFieldModule } from '@angular/material/form-field'; //mat-form-field
import { MatInputModule } from '@angular/material/input'; //mat input
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; // botones

import { ReactiveFormsModule } from '@angular/forms'; //uso del formulario


@NgModule({
  declarations: [
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ConfiguracionModule { }
