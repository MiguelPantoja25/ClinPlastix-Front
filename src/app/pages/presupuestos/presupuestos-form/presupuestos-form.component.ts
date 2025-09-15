import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presupuestos-form',
  templateUrl: './presupuestos-form.component.html',
  styleUrls: ['./presupuestos-form.component.scss'],
})
export class PresupuestosFormComponent implements OnInit {
  formularioPresupuesto!: FormGroup;

  // Catálogos (listas) usados en el HTML
  estadosPresupuesto = ['Borrador', 'Enviado', 'Aprobado', 'Rechazado', 'Cancelado'];
  condicionesPago = ['Contado', 'Parcialidades', 'Financiamiento'];
  monedas = ['MXN', 'USD', 'EUR'];
  metodosPago = ['Efectivo', 'Tarjeta', 'Transferencia', 'Seguro'];

  // Config fiscal 
  readonly IVA = 0.16; 

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioPresupuesto = this.fb.group({
      //  Datos generales
      numero: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaElaboracion: ['', Validators.required],
      paciente: ['', Validators.required],
      doctor: ['', Validators.required],
      usuario: ['', Validators.required],
      estado: ['Borrador', Validators.required],
      fechaVencimiento: ['', Validators.required],

      //  Detalle de conceptos 
      conceptos: this.fb.array([]),

      //  Totales
      subtotalGeneral: [{ value: 0, disabled: true }],
      descuentoTotal: [{ value: 0, disabled: true }],
      impuestosTotales: [{ value: 0, disabled: true }],
      totalFinal: [{ value: 0, disabled: true }],

      //  Datos adicionales
      condicionesPago: [''],
      notas: [''],
      moneda: ['MXN'],
      metodoPago: [''],
    });

    // Agrega al menos 1 renglón al iniciar
    this.agregarConcepto();

    this.conceptos.valueChanges.subscribe(() => this.recalcularTotales());
  }

  // ---------- Getters / Helpers ----------
  get conceptos(): FormArray {
    return this.formularioPresupuesto.get('conceptos') as FormArray;
  }

  private n(v: any): number {
    const num = Number(v);
    return isFinite(num) ? num : 0;
  }

  // ---------- Renglones de conceptos ----------
  agregarConcepto(): void {
    const grupo = this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      descuento: [0, [Validators.min(0)]], 
      subtotal: [{ value: 0, disabled: true }],
      impuestos: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
    });

    // Recalcula totales 
    grupo.valueChanges.subscribe(() => this.recalcularTotales());

    this.conceptos.push(grupo);
    this.recalcularTotales();
  }

  eliminarConcepto(i: number): void {
    this.conceptos.removeAt(i);
    this.recalcularTotales();
  }

  // ---------- Cálculos ----------
  private recalcularTotales(): void {
    let subtotalGeneral = 0;
    let descuentoTotal = 0;
    let impuestosTotales = 0;
    let totalFinal = 0;

    this.conceptos.controls.forEach((ctrl: AbstractControl) => {
      const g = ctrl as FormGroup;
      const cantidad = this.n(g.get('cantidad')?.value);
      const precio = this.n(g.get('precioUnitario')?.value);
      const descuento = this.n(g.get('descuento')?.value); 

      const subtotal = cantidad * precio;
      const base = Math.max(subtotal - descuento, 0);
      const impuestos = base * this.IVA;
      const total = base + impuestos;

      // Actualiza campos de la fila
      g.patchValue(
        { subtotal, impuestos, total },
        { emitEvent: false }
      );

      subtotalGeneral += subtotal;
      descuentoTotal += descuento;
      impuestosTotales += impuestos;
      totalFinal += total;
    });

    // Actualiza totales en el form
    this.formularioPresupuesto.get('subtotalGeneral')?.setValue(subtotalGeneral, { emitEvent: false });
    this.formularioPresupuesto.get('descuentoTotal')?.setValue(descuentoTotal, { emitEvent: false });
    this.formularioPresupuesto.get('impuestosTotales')?.setValue(impuestosTotales, { emitEvent: false });
    this.formularioPresupuesto.get('totalFinal')?.setValue(totalFinal, { emitEvent: false });
  }

  // ---------- Validación usada por el template ----------
  hasError(controlName: string, errorName: string): boolean {
    const c = this.formularioPresupuesto.get(controlName);
    return !!(c && c.touched && c.hasError(errorName));
  }

  hasErrorConcepto(i: number, controlName: string, errorName: string): boolean {
    const g = this.conceptos.at(i) as FormGroup;
    const c = g.get(controlName);
    return !!(c && c.touched && c.hasError(errorName));
  }

  // ---------- Acciones ----------
  guardar(): void {
    if (this.formularioPresupuesto.invalid) {
      this.formularioPresupuesto.markAllAsTouched();
      return;
    }
    // getRawValue para incluir controles deshabilitados 
    const payload = this.formularioPresupuesto.getRawValue();
    console.log('Presupuesto ->', payload);
    alert('Presupuesto guardado ');
    this.router.navigate(['/presupuestos']);
  }

  cancelar(): void {
    if (confirm('¿Cancelar y limpiar el formulario?')) {
      while (this.conceptos.length) this.conceptos.removeAt(0);
      this.formularioPresupuesto.reset({
        estado: 'Borrador',
        moneda: 'MXN',
      });
       this.agregarConcepto();
      
      this.router.navigate(['/presupuestos']);
    }
  }
}
