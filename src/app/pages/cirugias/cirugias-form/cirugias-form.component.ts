import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DataModal, ModalGenericoComponent } from '../../../@components/modal-generico/modal-generico.component';
import { ModalBusquedaPacienteComponent } from '../../../@components/modal-busqueda-paciente/modal-busqueda-paciente.component';

@Component({
  selector: 'app-cirugias-form', 
  templateUrl: './cirugias-form.component.html',
  styleUrls: ['./cirugias-form.component.scss']  
})
export class CirugiasFormComponent implements OnInit {
  formularioCirugias!: FormGroup;
  bloquearDatosPaciente: boolean = false;
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
    private dialog: MatDialog,

    ) {}

  busqueda(): void {
    const dialogRef = this.dialog.open(ModalBusquedaPacienteComponent,{
      width: '800px',
      data: {
        titulo: 'Búsqueda de Paciente',
        texto: 'Selecciona un paciente para llenar el formulario.',
        textoBtnCancelar: 'Cancelar',
        textoBtnExito: 'Aceptar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Resultado del diálogo:', result);
      debugger;
      this.formularioCirugias.patchValue(result);


      this.snack.open('Datos del paciente cargados correctamente', 'OK', {
        duration: 2500
      });

    } else {
      console.log('El diálogo fue cerrado sin resultado');
    
    }
  });
}

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
      idPaciente: ['', Validators.required],
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
      idPaciente: id.toString(),
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
    const datosConfirmacion: DataModal = {
    clase: '',
    titulo: 'Aviso',
    texto: `¿Desea guardar la cirugía?`,
    textoBtnExito: 'Aceptar',
    textoBtnCancelar: 'Cancelar',
  };
  const opciones: MatDialogConfig = { disableClose: true, hasBackdrop: true, data: datosConfirmacion };
  this.dialog.open(ModalGenericoComponent, opciones).afterClosed().subscribe(modal => {
    if(modal){
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        html: this.idEdit ? "La cirugía ha sido actualizada con éxito" : "La cirugía ha sido registrada con éxito",
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(["/cirugias"]);
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
        this.router.navigate(["/cirugias"]);
      }
    });
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
