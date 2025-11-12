import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

interface Cirugia {
  id: number;
  paciente: string;
  doctor: string;
  tipocirugia: 'estetica' | 'reconstructiva' | 'general' | 'curativas' | 'transplantes' ;
  estado: 'programada' | 'en curso' | 'finalizada' | 'cancelada' | 'reprogramada' ;
  fechaProgramada: string;
  prioridad: 'electiva' | 'urgente' ; 
}

@Component({
  selector: 'app-cirugias-list',
  templateUrl: './cirugias-list.component.html',
  styleUrls: ['./cirugias-list.component.scss']
})
export class CirugiasListComponent implements OnInit{
  resumen = [
    { icon: 'face_retouching_natural', valor: 0, titulo: 'Cirugía Estética' },
    { icon: 'healing', valor: 0, titulo: 'Cirugía Reconstructiva' },
    { icon: 'local_hospital', valor: 0, titulo: 'Cirugía General' },
    { icon: 'medication', valor: 0, titulo: 'Cirugías Curativas' },
    { icon: 'volunteer_activism', valor: 0, titulo: 'Trasplantes' }
  ];

  cirugias: Cirugia[] = [];
  filtro: string = '';
  displayedColumns: string[] = ['id', 'paciente', 'doctor', 'tipocirugia', 'estado', 'fechaProgramada', 'prioridad', 'acciones'];
  cirugiasFiltrados: Cirugia[] = []

   constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarMockCirugias();
    this.aplicarFiltro();
    this.calcularResumen();
  }
  cargarMockCirugias(): void {
    this.cirugias =[
      {
      id: 1,
      paciente: 'Karen Zarate',
      doctor: 'Dr.Galvan',
      tipocirugia: 'estetica',
      estado: 'programada',
      fechaProgramada: '20 de Octubre',
      prioridad: 'electiva',
      },
      {
      id: 2,
      paciente: 'Juan Perez',
      doctor: 'Dr.Tapia',
      tipocirugia: 'reconstructiva',
      estado: 'en curso',
      fechaProgramada: '18 de Septiembre',
      prioridad: 'urgente',
      },
      {
      id: 3,
      paciente: 'Ana Gomez',
      doctor: 'Dr.Garcia',
      tipocirugia: 'general',
      estado: 'finalizada',
      fechaProgramada: '17 de Septiembre',
      prioridad: 'electiva',
      }
    ];
  }

  calcularResumen(): void {
    const contador = {
      total: this.cirugias.length,
      estetica: 0,
      reconstructiva: 0,
      general: 0,
      curativas: 0,
      transplantes: 0,
    };
    for (const c of this.cirugias) {
      switch (c.tipocirugia) {
        case 'estetica': contador.estetica++; break;
        case 'reconstructiva': contador.reconstructiva++; break;
        case 'general': contador.general++; break;
        case 'curativas': contador.curativas++; break;
        case 'transplantes': contador.transplantes++; break;
      }
    }
    this.resumen = [
      { titulo: 'Cirugía Estética', valor: contador.estetica, icon: 'face_retouching_natural' },
      { titulo: 'Cirugía Reconstructiva', valor: contador.reconstructiva, icon: 'healing' },
      { titulo: 'Cirugía General', valor: contador.general, icon: 'local_hospital' },
      { titulo: 'Cirugías Curativas', valor: contador.curativas, icon: 'medication' },
      { titulo: 'Trasplantes', valor: contador.transplantes, icon: 'volunteer_activism' }
    ];
  }
  aplicarFiltro(): void {
    const texto = this.filtro.toLowerCase();
    this.cirugiasFiltrados = this.cirugias.filter(c =>
      c.tipocirugia.toLowerCase().includes(texto) ||
      c.estado.toLowerCase().includes(texto)
    );
  }
  editar(id: number): void {
    console.log('Editar id de la cirugia:', id);
    this.router.navigate(['/cirugias/editar', id]);
  }
  eliminar(id: number): void{
        Swal.fire({
          icon: 'warning',
          title: '¿Desea eliminar este paciente?',
          text: "Esta acción no se puede deshacer.",
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'Cancelar',
        }).then(result => {
        if (result.isConfirmed) {
          this.cirugias = this.cirugias.filter(c => c.id !== id);
          this.calcularResumen();
    
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El paciente ha sido eliminado con éxito',
            confirmButtonText: 'Aceptar'
          });
        }
      });
      }
  NuevaCirugia(): void {
    console.group('Crear nueva cirugia');
    this.router.navigate(['/cirugias/nuevo']);
  }
}
