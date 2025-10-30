import { Component, OnInit } from "@angular/core";
import { Paciente } from "../../../models/paciente";
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataModal, ModalGenericoComponent } from "../../../@components/modal-generico/modal-generico.component";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-pacientes-form",
  templateUrl: "./pacientes-form.component.html",
  styleUrl: "./pacientes-form.component.scss",
})
export class PacientesFormComponent implements OnInit {
  formularioPaciente!: FormGroup;
  infoAdicionalForm!: FormGroup;
  facturacionForm!: FormGroup;
  isLinear = true;
  titulo = "Nuevo Paciente";
  idEdit?: number;
  aseguradoraActiva = false;
  rfcActiva = false;

  private aseguradoraSub?: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snack: MatSnackBar, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.generaFormularios();
      this.aseguradoraSub = this.infoAdicionalForm.get('aseguradora')?.valueChanges.subscribe(valor => {
  this.aseguradoraActiva = !!valor && valor.trim() !== '';
});

this.facturacionForm.get('rfc')?.valueChanges.subscribe(valor => {
    this.rfcActiva = !!valor && valor.trim() !== '';
  });

    // detectar edición
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.idEdit = +id;
      this.titulo = "Editar Paciente";
      this.cargarPaciente(this.idEdit);
    }
  }

  ngOnDestroy(): void {
    this.aseguradoraSub?.unsubscribe();
  }

  generaFormularios() {
    this.formularioPaciente = this._formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      apellidoPaterno: ["", [Validators.required, Validators.minLength(2)]],
      apellidoMaterno: ["", [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ["", Validators.required],
      sexo: ["", Validators.required],
      telefono: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ["", [Validators.required, Validators.email]],
      curp: ["", [Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i)]],
      calleNumero: ["", [Validators.required, Validators.minLength(2)]],
      colonia: ["", [Validators.required, Validators.minLength(2)]],
      cp: ["", [Validators.required, Validators.pattern(/^\d{5}$/)]],
      municipio: ["", [Validators.required, Validators.minLength(2)]],
      estado: ["", [Validators.required, Validators.minLength(2)]],
      aceptaAvisoPrivacidad: [false, Validators.requiredTrue],
    });

    this.infoAdicionalForm = this._formBuilder.group({
      tipoSangre: ["", Validators.required],
      alergias: ["", Validators.required],
      padecimientos: ["", Validators.required],
      medicamentos: ["", Validators.required],
      emergenciaNombre: ["", Validators.required],
      emergenciaRelacion: ["", Validators.required],
      emergenciaTelefono: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      aseguradora: [""],
      poliza: [""],
      vigenciaDesde: [""],
      vigenciaHasta: [""],
    });

    this.facturacionForm = this._formBuilder.group({
      rfc: [""],
      factRazonSocial: [""],
      factUsoCfdi: [""],
      factCalleNumero: [""],
      factColonia: [""],
      factCp: [""],
      factMunicipio: [""],
      factEstado: [""],      
    });
  }

  private cargarPaciente(id: number): void {
    // MOCK: si quieres ver pre-cargado, pon datos dummy aquí.
    const mock: Paciente = {
      id: id.toString(),
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    fechaNacimiento: "1990-05-15",
    sexo: "femenino",
    telefono: "5551234567",
    email: "juan.perez@example.com",
    curp: "PEGA900515HMCRRL09",

    calleNumero: "Av. Reforma 123",
    colonia: "Centro",
    cp: "06000",
    municipio: "Ciudad de México",
    estado: "CDMX",

    tipoSangre: "O+",
    alergias: "Ninguna",
    padecimientos: "Ninguno",
    medicamentos: "Ninguno",

    emergenciaNombre: "María López",
    emergenciaRelacion: "Esposa",
    emergenciaTelefono: "5559876543",

    aseguradora: "Seguros Ejemplo",
    poliza: "POL123456",
    vigenciaDesde: "2024-01-01",
    vigenciaHasta: "2025-01-01",

    rfc: "PEGA9005151A0",
    factRazonSocial: "Juan Pérez García",
    factUsoCfdi: "G03",
    factCalleNumero: "Av. Reforma 123",
    factColonia: "Centro",
    factCp: "06000",
    factMunicipio: "Ciudad de México",
    factEstado: "CDMX",

    aceptaAvisoPrivacidad: true,
    };

    this.formularioPaciente.patchValue(mock);
    this.infoAdicionalForm.patchValue(mock);
    this.facturacionForm.patchValue(mock);
  }

  guardar(): void {
    if (this.formularioPaciente.invalid ||
        this.infoAdicionalForm.invalid ||
        this.facturacionForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos requeridos antes de continuar.",
      });
      return;
    }

    const payload: Paciente ={
      ...this.formularioPaciente.value,
      ...this.infoAdicionalForm.value,
      ...this.facturacionForm.value
    };
    console.log("Paciente guardado:", payload);
    
    Swal.fire({
      icon: 'success',
      title: 'Guardado exitosamente',
      text: "El paciente ha sido registrado con éxito",
      confirmButtonText: 'Aceptar'
    }).then(() => this.router.navigate(["/pacientes"]));
  }

  cancelar(): void {
    const datos: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `Esta seguro que desea cancelar el registro?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };

    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datos };
    this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        this.router.navigate(["/pacientes"]);
      }
    });
  }

validarFormulario(stepIndex: number, stepper: any): void {
    let formularioActual: FormGroup;

    switch (stepIndex) {
      case 0: formularioActual = this.formularioPaciente; break;
      case 1: formularioActual = this.infoAdicionalForm; break;
      default: return;
    }

    if (formularioActual.invalid) {
      formularioActual.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa correctamente todos los campos antes de continuar.',
        confirmButtonText: 'Aceptar'
      });
    } else {
      stepper.next();
    }
  }

  // helpers de validación para template
  hasError(campo: string, tipo: string): boolean {
    const control = 
    this.formularioPaciente.get(campo) ||
    this.infoAdicionalForm.get(campo) ||
    this.facturacionForm.get(campo);
    return !!(control && control.hasError(tipo) && (control.dirty || control.touched));
  }

onInputNumber(event: any): void {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
}
}