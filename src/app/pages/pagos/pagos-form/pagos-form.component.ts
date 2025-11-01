import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagos-form',
  templateUrl: './pagos-form.component.html',
  styleUrls: ['./pagos-form.component.scss']
})
export class PagosFormComponent implements OnInit {

  pagoForm!: FormGroup;
  archivoSeleccionado: File | null = null;
  archivosSeleccionados: File[] = [];
  mensajeError: string = '';
  tamanoMaximoMB = 1; 
  maxArchivos = 3;   

  formularioPagos: any;
  picker: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      idPaciente: ['', Validators.required],
      nombrePaciente: ['', Validators.required],
      expediente: [''],

      fechaPago: ['', Validators.required],
      concepto: ['', Validators.required],
      montoTotal: [0, [Validators.required, Validators.min(0)]],
      descuento: [0, [Validators.min(0)]],
      montoPagar: [{ value: 0, disabled: true }],

      metodoPago: ['', Validators.required],
      estado: ['pendiente', Validators.required],

      numRecibo: [''],
      observaciones: [''],
      responsable: ['', Validators.required]
    });
  }

  calcularMontoFinal(): void {
    const total = this.pagoForm.get('montoTotal')?.value || 0;
    const descuento = this.pagoForm.get('descuento')?.value || 0;
    const final = total - descuento;
    this.pagoForm.get('montoPagar')?.setValue(final >= 0 ? final : 0);
  }

  onArchivoSeleccionado(event: any): void {
    this.mensajeError = '';
    const archivos = Array.from(event.target.files) as File[];

    if (this.archivosSeleccionados.length + archivos.length > this.maxArchivos) {
      this.mensajeError = `Solo se permiten un máximo de ${this.maxArchivos} archivos.`;
      return;
    }

    for (let archivo of archivos) {
      const tamanoMB = archivo.size / (1024 * 1024);
      if (tamanoMB > this.tamanoMaximoMB) {
        this.mensajeError = `El archivo "${archivo.name}" excede el tamaño máximo de ${this.tamanoMaximoMB} MB.`;
        continue;
      }

      const nombreValido = /^[a-zA-Z0-9_\-\.]+$/.test(archivo.name);
      if (!nombreValido) {
        this.mensajeError = `El archivo "${archivo.name}" contiene caracteres no permitidos.`;
        continue;
      }
      this.archivosSeleccionados.push(archivo);
    }
    if (this.archivosSeleccionados.length === 0) {
      this.mensajeError = 'Debe subir al menos un archivo válido.';
    }
  }
  eliminarArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
  }

  guardarPago(): void {
    if (this.pagoForm.valid) {
      const datos = this.pagoForm.getRawValue();
      console.log('Pago guardado:', datos);
      console.log('Archivos adjuntos:', this.archivosSeleccionados);

      alert('Pago registrado correctamente');
      this.pagoForm.reset();
      this.archivosSeleccionados = [];
      this.mensajeError = '';
      this.router.navigate(['/pagos']);
    } else {
      alert('Por favor completa los campos obligatorios.');
      this.pagoForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    const confirmar = confirm('¿Deseas cancelar el registro del pago?');
    if (confirmar) {
      this.router.navigate(['/pagos']);
    }
  }
}
