import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DataModal {
  clase: string;
  titulo: string;
  texto: string;
  html? : any;
  textoBtnExito: string;
  textoBtnCancelar: string;
}
@Component({
  selector: 'app-modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrl: './modal-generico.component.scss'
})
export class ModalGenericoComponent {
  accion = '';
  constructor( public dialogRef: MatDialogRef<ModalGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public info: DataModal) { }
}