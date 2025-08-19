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
  estatusOptions: { value: Paciente["estatus"]; label: string }[] = [
    { value: "valoracion", label: "Consulta de valoración" },
    { value: "presupuesto", label: "Con presupuesto" },
    { value: "espera", label: "En espera de cirugía" },
    { value: "post", label: "Consulta post" },
    { value: "no-atendido", label: "No atendido" },
  ];

  generoOptions = ["M", "F", "Otro"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) // private pacientesService: PacientesService // cuando conectes backend
  { }

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
      id: new FormControl("", [Validators.required]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      apellidoPaterno: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      apellidoMaterno: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      fechaNacimiento: new FormControl("", [
        Validators.required
      ]),
      sexo: new FormControl("", [
        Validators.required
      ]),
      telefono: new FormControl("", [
        Validators.pattern(/^[0-9\-+\s()]{7,20}$/),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      curp: new FormControl("", [Validators.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i)]),
      estatus: new FormControl("valoracion", Validators.required),

    });
  }

  // Por ahora mock. Cuando tengas backend: this.pacientesService.getById(id)...
  private cargarPaciente(id: number): void {
    // MOCK: si quieres ver pre-cargado, pon datos dummy aquí.
    const mock: Paciente = {
      id,
      nombre: "Paciente",
      apellido: `#${id}`,
      telefono: "555-0000",
      correo: `paciente${id}@ejemplo.com`,
      estatus: "valoracion",
      fechaNacimiento: "",
      genero: "M",
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
    this.snack.open(
      this.idEdit ? "Paciente actualizado" : "Paciente creado",
      "OK",
      { duration: 2000 }
    );
    this.router.navigate(["/pacientes"]);
  }

  cancelar(): void {
    this.router.navigate(["/pacientes"]);
  }

  // helpers de validación para template
  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioPaciente.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }
}
