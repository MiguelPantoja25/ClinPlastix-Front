import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DataModal, ModalGenericoComponent } from '../../@components/modal-generico/modal-generico.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup;
  formularioRecuperar!: FormGroup;
  hide = true; // para mostrar/ocultar contraseña
  mostrarOlvido = false; //bandera

 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.generarForm();
    this.generarFormRecuperar();
  }

   generarForm(): void {
    this.formularioLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required,Validators.minLength(2),]),
      contraseña: new FormControl('', [ Validators.required,Validators.minLength(2),]),
    });
  }

  generarFormRecuperar(): void {
  this.formularioRecuperar = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
  });
  }


  IniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }
    

    const { usuario, contraseña } = this.formularioLogin.value;

    // ejemplo
    if (usuario === 'admin' && contraseña === '1234') {
      const userData = { nombre: 'Admin', rol: 'Administrador'};
        localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigate(['/dashboard']);
    
    } else {
      Swal.fire({
              icon: 'error',
              title: 'Error',
              html: "Usuario o contraseña incorrectos",
              confirmButtonText: 'Aceptar',
      });
    }
    }

  //Activar formulario de recuperacion 
   olvidoContrasena() {
    this.mostrarOlvido = true;
   }

   volverLogin() {
    this.mostrarOlvido = false;
   }

   //ejemplo
   recuperarContrasena(): void {
    if (this.formularioRecuperar.invalid) {
      this.formularioRecuperar.markAllAsTouched();
      return;
    }
    const { usuario, correo } = this.formularioRecuperar.value;
    //modal
    const datos: DataModal ={
      clase: '',
      titulo: 'Aviso',
      texto: `Se enviaron instrucciones a ${correo} para el usuario ${usuario} pueda recuperar la contraseña`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones = { disableClose: true, hasBackdrop: true, data: datos };
    this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(result => {
    this.volverLogin();
  });
}

  // Helper para el template
  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioLogin.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }
  
}
