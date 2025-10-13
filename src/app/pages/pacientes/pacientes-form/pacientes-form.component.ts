import { Component, OnInit } from "@angular/core";
import { Paciente } from "../../../models/paciente";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataModal, ModalGenericoComponent } from "../../../@components/modal-generico/modal-generico.component";
@Component({
  selector: "app-pacientes-form",
  templateUrl: "./pacientes-form.component.html",
  styleUrl: "./pacientes-form.component.scss",
})
export class PacientesFormComponent implements OnInit {
  formularioPaciente!: FormGroup;
  titulo = "Nuevo Paciente";
  idEdit?: number;
  paciente = {
    genero: "",
    // otras propiedades...
  };
  /*
  estatusOptions: { value: Paciente["estatus"]; label: string }[] = [
    { value: "valoracion", label: "Consulta de valoración" },
    { value: "presupuesto", label: "Con presupuesto" },
    { value: "espera", label: "En espera de cirugía" },
    { value: "post", label: "Consulta post" },
    { value: "no-atendido", label: "No atendido" },
  ];
*/
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snack: MatSnackBar // private pacientesService: PacientesService // cuando conectes backend
  ) { }

  ngOnInit() {
    this.generaForm();

    // detectar edición
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.idEdit = +id;
      this.titulo = "Editar Paciente";
      this.cargarPaciente(this.idEdit);
    }
  }

  generaForm() {
    this.formularioPaciente = new FormGroup({
      id: new FormControl("1", [Validators.required]),
      nombre: new FormControl("", [Validators.required,Validators.minLength(2),]),
      apellidoPaterno: new FormControl("", [Validators.required,Validators.minLength(2),]),
      apellidoMaterno: new FormControl("", [Validators.required,Validators.minLength(2),]),
      fechaNacimiento: new FormControl("", [Validators.required]),
      sexo: new FormControl("", [Validators.required]),
      telefono: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]{10}$/),]),
      email: new FormControl("", [Validators.required, Validators.email]),
      curp: new FormControl("", [Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i),]),

      calleNumero: new FormControl("", [Validators.required,Validators.minLength(2),]),
      colonia: new FormControl("", [Validators.required,Validators.minLength(2),]),
      cp: new FormControl("",[Validators.required, Validators.pattern(/^\d{5}$/)]),
      municipio: new FormControl("", [Validators.required,Validators.minLength(2),]),
      estado: new FormControl("", [Validators.required,Validators.minLength(2),]),

      tipoSangre: new FormControl("", [Validators.required,Validators.minLength(2),]),
      alergias: new FormControl("", [Validators.required,Validators.minLength(2),]),
      padecimientos: new FormControl("", [Validators.required,Validators.minLength(2),]),
      medicamentos: new FormControl("", [Validators.required,Validators.minLength(2),]),

      emergenciaNombre: new FormControl("", [Validators.required,Validators.minLength(2),]),
      emergenciaRelacion: new FormControl("", [Validators.required,Validators.minLength(2),]),
      emergenciaTelefono: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]{10}$/),]),

      aseguradora: new FormControl("", ),
      poliza: new FormControl("", ),
      vigenciaDesde: new FormControl("", ),
      vigenciaHasta: new FormControl("", ),

      rfc: new FormControl("", ),
      factRazonSocial: new FormControl("", ),
      factUsoCfdi: new FormControl("", ),
      factCalleNumero: new FormControl("", ),
      factColonia: new FormControl("", ),
      factCp: new FormControl("", ),
      factMunicipio: new FormControl("", ),
      factEstado: new FormControl("", ),

      aceptaAvisoPrivacidad: new FormControl(false, ),
    });
  }

  // Por ahora mock. Cuando tengas backend: this.pacientesService.getById(id)...
  private cargarPaciente(id: number): void {
    // MOCK: si quieres ver pre-cargado, pon datos dummy aquí.
    const mock: Paciente = {
      id: id.toString(),
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    fechaNacimiento: "1990-05-15",
    sexo: "femenino",
    telefono: "555-123-4567",
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
    emergenciaTelefono: "555-987-6543",

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
    console.log(mock);
  }

  guardar(): void {
    if (this.formularioPaciente.invalid) {
      this.formularioPaciente.markAllAsTouched();
      return;
    }

    const payload: Paciente = {
      ...this.formularioPaciente.value,
      id: this.idEdit,
    };

    // Cuando conectes backend:
    // const req$ = this.idEdit
    //   ? this.pacientesService.update(this.idEdit, payload)
    //   : this.pacientesService.create(payload);

    // req$.subscribe(() => { ... });

    // MOCK de guardado:
    Swal.fire({
      //icon: 'question',
      //icon: 'error',
      //icon: 'info',
      icon: 'success',
      title: 'Registro exitoso',
      html: "El paciente ha sido registrado con éxito",
      confirmButtonText: 'Aceptar',
    });
    this.router.navigate(["/pacientes"]);
  }

  //cancelar(): void {
    //this.router.navigate(["/pacientes"]);
  //}

  cancelar(): void {
    const datos: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `Esta seguro que desea cancelar el registro?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datos };
    const dialogRefCancel = this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        this.router.navigate(["/pacientes"]);
      }
    });
  }

  // helpers de validación para template
  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioPaciente.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }

onInputNumber(event: any) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
}
}