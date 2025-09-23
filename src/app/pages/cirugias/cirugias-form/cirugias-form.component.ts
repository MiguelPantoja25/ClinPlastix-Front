import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-cirugias-form', 
  templateUrl: './cirugias-form.component.html',
  styleUrls: ['./cirugias-form.component.scss']  
})
export class CirugiasFormComponent implements OnInit {
  formularioCirugias!: FormGroup;
  titulo = "Nueva Cirugia" ;
  idEdit?: number;
  cirugia = {
    nombre: "",
    //otras propiedades
  };


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    ) {}
  ngOnInit() {
    this.generaForm();

    //detecta si es edicion
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.idEdit = +id;
      this.titulo = "Editar Cirugía";
      this.cargarCirugia(this.idEdit);
    }
  }

    generaForm(){
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

  //simulacion para precargar datos en el mock de edicion 
  private cargarCirugia(id: number): void{
    const mock: any = {
      folio: id.toString(),
      nombre: 'Juan',
      apellidoPaterno: 'Perez',
      apellidoMaterno: 'Garcia',
      fechaNacimiento: "1990-05-15",
      sexo: "masculino",
      telefono: "5569854100",
      email: "juan.perez@gmail.com",
      cirujano:'Dr.Galvan',
      especialidadDoctor: "general",
      equipoMedico: "enfermeria",
      tipoCirugia: 'estetica',
      descripcion: "Se relaizara un proceimiento quirurgico estetico con el fin de mejorar la apariencia" ,
      estadoCirugia: "programada",
      prioridad: "electiva" ,

      examenesPreoperatorios: "laboratorio",
      evaluacionAnestesica: "Anestesia local con sedacion",
      alergiasPaciente: "Ningunas" ,
      medicamentosActuales: "ibuprofeno" ,
      ayunoConfirmado: "si",
      consentimiento: "adjunto" ,

      // Detalles intraoperatorios
      horaInicio: "15:00",
      horaFin: "17:30",
      anestesiaTipoDosis: "local",
      materialQuirurgico: "pinzas tijeras",
      complicacionesIntraoperatorias: "ninguna",
      notasQuirurgicas: "paciente en quirofano ",

      // Postoperatorio
      diagnosticoPostoperatorio: "ninguno",
      indicacionesMedicas: "reposo",
      medicamentosPostoperatorios: "paracetamol con ibuprofeno",
      tiempoRecuperacion: "15 dias",
      hospitalizacionRequerida: "si",
      salaCamaAsignada: "b-36",

      // Auditoría y control
      usuarioRegistro: "admin",
      fechaRegistro: "2025-09-20",
      ultimaActualizacion: "2025-09-22",
      historialCambios: "ninguno"

    };
    this.formularioCirugias.patchValue(mock);
    console.log(mock);
  }

   
  guardar(): void {
    if (this.formularioCirugias.invalid) { //revisa que no haya campos vacios
      this.formularioCirugias.markAllAsTouched(); // todos los campos tocados y marque mensaje de error
      return; //corta jecucion y no guarda.
    }

    const confirmar = window.confirm("¿Deseas guardar la cirugía?"); //muestra ventana de navegacion con la ¿?
    if (confirmar) {
      console.log("Datos guardados:", this.formularioCirugias.value);

      this.snack.open(
        this.idEdit ? "Cirugía actualizada" : "Cirugía registrada", // edicion y muestra mensaje
        "OK",
        { duration: 2000 } //duracion del mesnaje de 2 segundos 
      );

      this.router.navigate(["/cirugias"]); //redirige a la pantalla donde esta la lista
    } else {
      console.log("El usuario canceló el guardado"); 
    }
  }

  cancelar(): void {
    const confirmar = window.confirm("¿Deseas cancelar y volver a la lista?");
    if (confirmar) {
      this.router.navigate(["/cirugias"]); // 👉 redirige a la lista
    } else {
      console.log("El usuario decidió continuar en el formulario");
    }
  }

  hasError(ctrl: string, error: string): boolean {
    const c = this.formularioCirugias.get(ctrl);
    return !!c && c.touched && c.hasError(error);
  }
  
  onInputNumber(event: any) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, "");
  }
}
