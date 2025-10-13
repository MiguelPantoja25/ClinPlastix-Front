import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

      this.snack.open('Inicio de sesión correcto', 'OK', { duration: 2000 });
      console.log('Redirigiendo a dashboard...');
      this.router.navigate(['/dashboard']); // redirige 
    } else {
      this.snack.open('Usuario o contraseña incorrectos', 'Cerrar', {
        duration: 3000,
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
    this.snack.open(
      `Se enviaron instrucciones a ${correo} para el usuario ${usuario}`, 
      'OK', 
      { duration: 4000 } 
      );
    this.volverLogin();
  }

  // Helper para el template
  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioLogin.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }
  
}
