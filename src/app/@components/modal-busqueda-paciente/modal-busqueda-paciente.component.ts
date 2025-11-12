import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

//Datos que mostarra el Dialogo
export interface  ModalBusquedaPacienteData {
  titulo: string;
  texto: string;
  textoBtnCancelar: string;
  textoBtnExito: string;
}

@Component({
  selector: 'app-modal-busqueda-paciente',
  templateUrl: './modal-busqueda-paciente.component.html',
  styleUrl: './modal-busqueda-paciente.component.scss',
})

export class ModalBusquedaPacienteComponent implements OnInit {
  tipoBusqueda: string = 'nombre';
  valorBusqueda: string = '';
  pacienteSeleccionado: any = null; //MODIFICADO
  puedeBuscar: boolean = true;
  formularioCirugias: any = {}; //FORMULARIO DATOS PRECARGADOS
  mostrarTabla: boolean = false;
  bloquearDatosPaciente: boolean = false;


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidoPaterno',
    'correo',
    'telefono',
    'fechaNacimiento',
    'acciones'
  ];

  pacientes = [
      { id: 1, nombre: 'Karol', apellidoPaterno: 'Zárate', correo: 'kenia@correo.com', telefono: '5516602588', fechaNacimiento: '1999-01-15' },
      { id: 2, nombre: 'Juan', apellidoPaterno: 'Pérez', correo: 'juan@correo.com', telefono: '5569741230', fechaNacimiento: '1998-03-22' },
      { id: 3, nombre: 'Andrea', apellidoPaterno: 'López', correo: 'andrea@correo.com', telefono: '9687623412', fechaNacimiento: '1999-11-09' },
      { id: 4, nombre: 'Carlos', apellidoPaterno: 'Hernández', correo: 'carlos@correo.com', telefono: '5568831697', fechaNacimiento: '2000-05-15' },
      { id: 5, nombre: 'Karen', apellidoPaterno: 'Pereyra', correo: 'karen@correo.com', telefono: '5578831978', fechaNacimiento: '2005-06-021' }

    ];

  constructor(
    public dialogRef: MatDialogRef<ModalBusquedaPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public info: ModalBusquedaPacienteData
  ) {}

  ngOnInit(): void {
    //muestra datos de la tabla 
    this.dataSource.data = []; //SE MODIFICO NO SE VE LA TABLA 
    //tipo de filtro a utilizar 
    this.dataSource.filterPredicate = (data:any, filter:string) => {
      const valor = filter.trim().toLowerCase();
      if (this.tipoBusqueda === 'id') return data.id.toString().includes(valor);
      if (this.tipoBusqueda === 'nombre') return data.nombre.toLowerCase().includes(valor);
      if (this.tipoBusqueda === 'correo') return data.correo.toLowerCase().includes(valor);
      return false;
    };
  }

  buscar(): void {
    const valor = this.valorBusqueda.trim().toLowerCase();

    if (!valor) {
     this.mostrarTabla = false;   // activamos el filtro /// se modifico
      return; //MODIFICO
    }  
    const filtrados = this.pacientes.filter(paciente => {
      if (this.tipoBusqueda === 'id') return paciente.id.toString().includes(valor);
      if (this.tipoBusqueda === 'nombre') return paciente.nombre.toLowerCase().includes(valor);
      if (this.tipoBusqueda === 'correo') return paciente.correo.toLowerCase().includes(valor);
      return false;
    });
      if (filtrados.length > 0) {
        this.dataSource.data = filtrados;
         this.mostrarTabla = true;
      }else {
        this.dataSource.data = [];
    this.mostrarTabla = false;
      }
  }

  cancelar(): void {  //cierra el modal 
    this.dialogRef.close();
  }

  seleccionarPaciente(paciente: any): void {
    this.pacienteSeleccionado = paciente;
  }

 abrirModal(): void {
  Swal.fire({
      //icon: 'succes',
      //icon: 'error',
      //icon: 'info',
      icon: 'success',
      title: 'Paciente seleccionado',
      html: `¿Está de acuerdo con el paciente ${this.pacienteSeleccionado.nombre}?`,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      showCancelButton: true, 
      focusCancel: true, 
    }).then((result) => {
    if (result.isConfirmed) {
      debugger;
      this.cargarDatosMock(this.pacienteSeleccionado);
      this.bloquearDatosPaciente = true;
      this.dialogRef.close(this.formularioCirugias);
    } else if (result.isDismissed) {
          this.pacienteSeleccionado = null; //Limpia selección
          this.dataSource.data = this.pacientes; //Regresa a la tabla inicial
          this.valorBusqueda = ''; 
    }
  });
}

  //simulacion para precargar datos en el mock de edicion 
  private cargarDatosMock(paciente: any): void{
    const mock: any = {
      folio: paciente.id.toString(),
      idPaciente: paciente.id.toString(),
      nombre: paciente.nombre,
      apellidoPaterno: paciente.apellidoPaterno,
      apellidoMaterno: 'Garcia',
      fechaNacimiento: paciente.fechaNacimiento,
      sexo: 'femenino',
      telefono: paciente.telefono,
      email: paciente.correo,
      cirujano:'',
      especialidadDoctor: '',
      equipoMedico: '',
      tipoCirugia: '',
      descripcion: '' ,
      estadoCirugia: '',
      prioridad: '' ,

      examenesPreoperatorios: '',
      evaluacionAnestesica: '',
      alergiasPaciente: '' ,
      medicamentosActuales: '' ,
      ayunoConfirmado: '',
      consentimiento: '' ,

      // Detalles intraoperatorios
      horaInicio: '',
      horaFin: '',
      anestesiaTipoDosis: '',
      materialQuirurgico: '',
      complicacionesIntraoperatorias: '',
      notasQuirurgicas: '',

      // Postoperatorio
      diagnosticoPostoperatorio: '',
      indicacionesMedicas: '',
      medicamentosPostoperatorios: '',
      tiempoRecuperacion: '',
      hospitalizacionRequerida: '',
      salaCamaAsignada: '',

      // Auditoría y control
      usuarioRegistro: '',
      fechaRegistro: '',
      ultimaActualizacion: '',
      historialCambios: ''

    };
  this.formularioCirugias = mock;
    this.bloquearDatosPaciente = true;
  }
}


