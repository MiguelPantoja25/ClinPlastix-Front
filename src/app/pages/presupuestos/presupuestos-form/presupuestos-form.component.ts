import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataModal, ModalGenericoComponent } from '../../../@components/modal-generico/modal-generico.component';


@Component({
  selector: 'app-presupuestos-form',
  templateUrl: './presupuestos-form.component.html',
  styleUrls: ['./presupuestos-form.component.scss'],
})
export class PresupuestosFormComponent implements OnInit {
  formularioPresupuesto!: FormGroup;
  titulo = 'Nuevo Presupuesto';
  idEdit?: number;

  // Catálogos
  estadosPresupuesto = ['Borrador', 'Enviado', 'Aprobado', 'Rechazado', 'Cancelado'];
  condicionesPago = ['Contado', 'Parcialidades', 'Financiamiento'];
  monedas = ['MXN', 'USD', 'EUR'];
  metodosPago = ['Efectivo', 'Tarjeta', 'Transferencia', 'Seguro'];

  readonly IVA = 0.16;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.generarFormulario();

    // detectar edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEdit = +id;
      this.titulo = 'Editar Presupuesto';
      this.cargarPresupuesto(this.idEdit);
    }
  }

  generarFormulario(): void {
    this.formularioPresupuesto = this.fb.group({
      // Datos generales
      numero: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaElaboracion: ['', Validators.required],
      paciente: ['', Validators.required],
      doctor: ['', Validators.required],
      usuario: ['', Validators.required],
      estado: ['Borrador', Validators.required],
      fechaVencimiento: ['', Validators.required],

      // Detalle de conceptos
      conceptos: this.fb.array([]),

      // Totales
      subtotalGeneral: [{ value: 0, disabled: true }],
      descuentoTotal: [{ value: 0, disabled: true }],
      impuestosTotales: [{ value: 0, disabled: true }],
      totalFinal: [{ value: 0, disabled: true }],

      // Datos adicionales
      condicionesPago: [''],
      notas: [''],
      moneda: ['MXN'],
      metodoPago: [''],
    });

    this.agregarConcepto();
    this.conceptos.valueChanges.subscribe(() => this.recalcularTotales());
  }

  // ---------- Getters ----------
  get conceptos(): FormArray {
    return this.formularioPresupuesto.get('conceptos') as FormArray;
  }

  // ---------- Conceptos ----------
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

    grupo.valueChanges.subscribe(() => this.recalcularTotales());
    this.conceptos.push(grupo);
    this.recalcularTotales();
  }

  eliminarConcepto(i: number): void {
    this.conceptos.removeAt(i);
    this.recalcularTotales();
  }

  // ---------- Totales ----------
  private n(v: any): number {
    const num = Number(v);
    return isFinite(num) ? num : 0;
  }

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

      g.patchValue({ subtotal, impuestos, total }, { emitEvent: false });

      subtotalGeneral += subtotal;
      descuentoTotal += descuento;
      impuestosTotales += impuestos;
      totalFinal += total;
    });

    this.formularioPresupuesto.patchValue(
      {
        subtotalGeneral,
        descuentoTotal,
        impuestosTotales,
        totalFinal,
      },
      { emitEvent: false }
    );
  }

  // ---------- Mock carga al editar ----------
  private cargarPresupuesto(id: number): void {
    const mock = {
      numero: id,
      fechaElaboracion: new Date('2025-09-01'),
      paciente: 'Juan Pérez',
      doctor: 'Dr. Ramírez',
      usuario: 'Admin',
      estado: 'Aprobado',
      fechaVencimiento: new Date('2025-09-30'),
      condicionesPago: 'Contado',
      notas: 'Ejemplo de nota',
      moneda: 'MXN',
      metodoPago: 'Efectivo',
      conceptos: [
        {
          descripcion: 'Consulta general',
          cantidad: 1,
          precioUnitario: 500,
          descuento: 0,
          subtotal: 500,
          impuestos: 80,
          total: 580,
        },
      ],
    };

    // Limpiar conceptos antes de asignar
    while (this.conceptos.length) this.conceptos.removeAt(0);

    this.formularioPresupuesto.patchValue(mock);

    mock.conceptos.forEach((c) => {
      const grupo = this.fb.group({
        descripcion: [c.descripcion, Validators.required],
        cantidad: [c.cantidad, [Validators.required, Validators.min(1)]],
        precioUnitario: [c.precioUnitario, [Validators.required, Validators.min(0)]],
        descuento: [c.descuento, [Validators.min(0)]],
        subtotal: [{ value: c.subtotal, disabled: true }],
        impuestos: [{ value: c.impuestos, disabled: true }],
        total: [{ value: c.total, disabled: true }],
      });
      grupo.valueChanges.subscribe(() => this.recalcularTotales());
      this.conceptos.push(grupo);
    });

    this.recalcularTotales();
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
    const datosConfirmacion: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `¿Desea guardar el presupuesto?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datosConfirmacion };
    this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          html: this.idEdit ? "El presupuesto ha sido actualizado con éxito" : "El presupuesto ha sido registrado con éxito",
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(["/presupuestos"]);
        });
  }
});
  }
  cancelar(): void {
    const datos: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `¿Está seguro que desea cancelar el registro?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datos };
    const dialogRefCancel = this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        this.router.navigate(["/presupuestos"]);
      }
    });
  }
}
