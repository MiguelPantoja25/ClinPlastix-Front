import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cirugias-form', 
  templateUrl: './cirugias-form.component.html',
  styleUrls: ['./cirugias-form.component.scss']  
})
export class CirugiasFormComponent {
  formularioCirugias: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioCirugias = this.fb.group({
      // Datos generales
      folio: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2)]],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      cirujano: ['', [Validators.required, Validators.minLength(3)]],
      especialidadDoctor: ['', [Validators.required, Validators.minLength(2)]],
      equipoMedico: [[]],
      tipoCirugia: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      estadoCirugia: ['', Validators.required],
      prioridad: ['', Validators.required],

      // Preparación preoperatoria
      examenesPreoperatorios: [[]],
      evaluacionAnestesica: ['', Validators.required],
      alergiasPaciente: ['', Validators.required],
      medicamentosActuales: ['', Validators.required],
      ayunoConfirmado: ['', Validators.required],
      consentimiento: ['', Validators.required],

      // Detalles intraoperatorios
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      anestesiaTipoDosis: ['', Validators.required],
      materialQuirurgico: ['', Validators.required],
      complicacionesIntraoperatorias: ['', Validators.required],
      notasQuirurgicas: ['', Validators.required],

      // Postoperatorio
      diagnosticoPostoperatorio: ['', Validators.required],
      indicacionesMedicas: ['', Validators.required],
      medicamentosPostoperatorios: ['', Validators.required],
      tiempoRecuperacion: ['', Validators.required],
      hospitalizacionRequerida: ['', Validators.required],
      salaCamaAsignada: ['', Validators.required],

      // Auditoría y control
      usuarioRegistro: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      ultimaActualizacion: ['', Validators.required],
      historialCambios: ['', Validators.required]
    });
  }

  hasError(campo: string, error: string) {
    return this.formularioCirugias.get(campo)?.hasError(error);
  }

  guardar(): void {
  if (this.formularioCirugias.valid) {
    const confirmar = window.confirm("¿Deseas continuar con el guardado?");
    if (confirmar) {
      console.log('Datos del formulario:', this.formularioCirugias.value);
      // 👉 Aquí llamas a tu servicio para guardar en backend
    } else {
      console.log('Guardado cancelado por el usuario');
    }
  } else {
    console.log('Formulario inválido');
    this.formularioCirugias.markAllAsTouched(); // Marca todos los campos para mostrar errores
  }
  }
  cancelar(): void {
  const confirmarCancelacion = window.confirm("¿Deseas cancelar la operación?");
  if (confirmarCancelacion) {
    console.log(" El usuario canceló la operación");
    // 👉 Aquí podrías redirigir a otra página si quieres, pero ya no borra el formulario
  } else {
    console.log("El usuario decidió continuar en el formulario");
  }
  }
  
  onInputNumber(event: any) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '');
}
  
}


