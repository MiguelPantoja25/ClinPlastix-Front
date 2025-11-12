import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirugiasRoutingModule } from './cirugias-routing.module';
import { CirugiasListComponent } from './cirugias-list/cirugias-list.component';
import { CirugiasFormComponent } from './cirugias-form/cirugias-form.component';

// Angular forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { A11yModule } from '@angular/cdk/a11y';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatTableModule } from '@angular/material/table'; //tabla
import { MatDialogModule } from '@angular/material/dialog';
import { ModalBusquedaPacienteComponent } from '../../@components/modal-busqueda-paciente/modal-busqueda-paciente.component';

@NgModule({
  declarations: [
    CirugiasListComponent,
    CirugiasFormComponent,
    ModalBusquedaPacienteComponent
  ],
  imports: [
    CommonModule,
    CirugiasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,

    // Angular Material
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
     MatTableModule, //tabla
   MatDialogModule
  ]
})

export class CirugiasModule { }
