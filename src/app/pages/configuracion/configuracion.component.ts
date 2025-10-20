import { Component, OnInit } from '@angular/core';
import { FormBuilder, //creacion del formulario 
   FormGroup, //formulario completo
   Validators, //validaciones requeridas del formulario 
   AbstractControl,//validaciones personalizadas
   ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataModal, ModalGenericoComponent } from '../../@components/modal-generico/modal-generico.component';
import { Router } from '@angular/router';
   //decorados.
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent implements OnInit {
 formularioConfiguracion!: FormGroup; //var. del formulario 

 hide = true; //var. para ocultar/mostrar contraseña
 hideConfirm = true; //Confirmacion de contraseña
 editando = false; ///// si se puede editar o no 

 //datos precargados.
 usuarioActual = {
    correo: 'zaratehernandez@gmail.com',
    telefono: '5579486711',
    password: 'Zarate21',
    confirmPassword: 'Zarate21',
    avatar: 'https://c0.klipartz.com/pngpicture/439/19/gratis-png-icono-de-perfil-de-usuario-de-avatar-thumbnail.png' 
  };

 constructor(private fb: FormBuilder, 
  private dialog: MatDialog,
  private router: Router,
) {} 

 ///validaciones del formulario.
   ngOnInit(): void {
    this.formularioConfiguracion = this.fb.group (
      {
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        avatar: [''] 
      },
      { validators: this.passwordsIguales } //validacion de contraseñas iguales
    );
    
     //  Precargar datos
  {
    this.formularioConfiguracion.patchValue(this.usuarioActual);

    //  Deshabilitar form
    this.formularioConfiguracion.disable();
  }


   } //compara ambas contraseñas 
    passwordsIguales(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true }
    }

    hasError(controlName: string, errorName: string): boolean {
    const control = this.formularioConfiguracion.get(controlName);
    return !!(control && control.hasError(errorName) && control.touched);
    }
    
    onInputNumber(event: any) { //telefono solo numeros
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, "");
    }
  //edicion o no edicion 
  toggleEditarCancelar(): void {
    this.editando = !this.editando;

    if (this.editando) {
      //habilitar
      this.formularioConfiguracion.enable();

      //mostrar contraseña/editar
      this.hide = false;
      this.hideConfirm = false;

    } else {
      this.cancelar();
      this.formularioConfiguracion.patchValue(this.usuarioActual); //vuelve a los datos iguales
      this.formularioConfiguracion.disable(); // solo lectura sin edicion 
      this.formularioConfiguracion.markAsPristine(); 
      this.formularioConfiguracion.markAsUntouched();

      //ocultar contraseña/cancelar
      this.hide = true;
      this.hideConfirm = true;

    }
  }
  // cancelar
  cancelar(): void {
    const datos: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `¿Está seguro que desea cancelar los cambios?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datos };
    this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        this.formularioConfiguracion.patchValue(this.usuarioActual);
        this.formularioConfiguracion.disable();
        this.formularioConfiguracion.markAsPristine();
        this.formularioConfiguracion.markAsUntouched();
        this.hide = true;
        this.hideConfirm = true;
        this.editando = false;

        Swal.fire({
          icon: 'info',
          title: 'Edición cancelada',
          html: 'Los cambios no fueron guardados.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/configuracion']);
        });
      } else {
        this.editando = true;
      }
    });
  }
  // Guardar
    guardar(): void {
      if (this.formularioConfiguracion.invalid) { 
        this.formularioConfiguracion.markAllAsTouched(); 
        return; 
      }
      const datosConfirmacion: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: `¿Desea guardar la configuracion?`,
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar',
    };
    const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datosConfirmacion };
    this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
      if(modal){
        Swal.fire({
          icon: 'success',
          title: 'Configuración actualizada',
          html: 'La combios se han guardado correctamente',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(["/configuracion"]);
        });
      }
    });
}
}