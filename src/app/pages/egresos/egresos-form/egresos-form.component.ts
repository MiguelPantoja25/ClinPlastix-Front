import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-egresos-form',
  templateUrl: './egresos-form.component.html',
  styleUrls: ['./egresos-form.component.scss']
})
export class EgresosFormComponent implements OnInit {

  egresoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.egresoForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', Validators.required],
      metodoPago: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  guardarEgreso(): void {
    if (this.egresoForm.valid) {
      console.log('Datos guardados:', this.egresoForm.value);

      this.snackBar.open('Egreso guardado exitosamente', 'Cerrar', { duration: 2500 });

      this.egresoForm.reset();  

      setTimeout(() => {
        this.router.navigate(['/egresos']);
      }, 300);
    }
  }

  cancelar(): void {
    this.router.navigate(['/egresos']);
  }
}
