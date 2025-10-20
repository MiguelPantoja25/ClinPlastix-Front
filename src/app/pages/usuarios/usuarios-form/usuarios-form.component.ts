import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataModal, ModalGenericoComponent } from '../../../@components/modal-generico/modal-generico.component';
@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.scss"],
})
export class UsuariosFormComponent implements OnInit {
  formularioUsuario!: FormGroup;
  titulo = "Nuevo Usuario";
  idEdit?: number;

  // control para mostrar/ocultar contraseñas
  hide = true;
  hideConfirm = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.generaForm();

    // detectar edición
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.idEdit = +id;
      this.titulo = "Editar Usuario";
      this.cargarUsuario(this.idEdit);
    }
  }

  generaForm() {
    this.formularioUsuario = new FormGroup(
      {
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
        email: new FormControl("", [
          Validators.required,
          Validators.email,
        ]),
        telefono: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
        ]),
        username: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        estado: new FormControl("activo", [Validators.required]),
        rol: new FormControl("", [Validators.required]),
        menu: new FormControl(""),
        departamento: new FormControl(""),
        avatar: new FormControl(""),
        fechaRegistro: new FormControl({
          value: new Date().toISOString().split("T")[0],
          disabled: true,
        }),
        ultimoAcceso: new FormControl({ value: "", disabled: true }),
      },
      { validators: this.passwordsMatchValidator } 
    );
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private cargarUsuario(id: number): void {
    // MOCK de datos (para edición)
    const mock = {
      nombre: "Carlos",
      apellidoPaterno: "Ramírez",
      apellidoMaterno: "López",
      email: "carlos.ramirez@example.com",
      telefono: "5512345678",
      username: "carlosrl",
      password: "123456",
      confirmPassword: "123456",
      estado: "activo",
      rol: "doctor",
      menu: "menú de doctor",
      departamento: "Medicina General",
      avatar: "https://i.pravatar.cc/150?u=carlos",
      fechaRegistro: "2024-05-10",
      ultimoAcceso: "2025-08-15",
    };

    this.formularioUsuario.patchValue(mock);
  }

  guardar(): void {
    if (this.formularioUsuario.invalid) {
      this.formularioUsuario.markAllAsTouched();
      return;
    }
    const datosConfirmacion: DataModal = {
    clase: '',
    titulo: 'Aviso',
    texto: `¿Desea guardar el usuario?`,
    textoBtnExito: 'Aceptar',
    textoBtnCancelar: 'Cancelar',
  };
  const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datosConfirmacion };
  this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
    if(modal){
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        html: this.idEdit ? "El usuario ha sido actualizado con éxito" : "El usuario ha sido registrado con éxito",
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(["/usuarios"]);
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
        this.router.navigate(["/usuarios"]);
      }
    });
  }

  // helpers de validación para template
  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioUsuario.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }

  onInputNumber(event: any) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
}

}
