import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasFormComponent } from './citas-form/citas-form.component';
import { CitasListComponent } from './citas-list/citas-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PacientesRoutingModule } from '../pacientes/pacientes-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    CitasFormComponent,
    CitasListComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        PacientesRoutingModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDivider,
        MatCheckboxModule,
    ]
})
export class CitasModule { }
