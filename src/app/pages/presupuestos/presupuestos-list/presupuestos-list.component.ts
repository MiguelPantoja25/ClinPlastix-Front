import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Presupuesto {
  id: number;
  fechaElaboracion: Date;
  paciente: string;
  medico: string;
  usuario: string;
  estado: string;
  fechaVencimiento: Date;
}

@Component({
  selector: 'app-presupuestos-list',
  templateUrl: './presupuestos-list.component.html',
  styleUrls: ['./presupuestos-list.component.scss']
})
export class PresupuestosListComponent implements OnInit {

  presupuestos: Presupuesto[] = [
    {
      id: 1,
      fechaElaboracion: new Date('2025-09-01'),
      paciente: 'Juan Pérez',
      medico: 'Dr. Ramírez',
      usuario: 'Admin',
      estado: 'Aprobado',
      fechaVencimiento: new Date('2025-09-30')
    },
    {
      id: 2,
      fechaElaboracion: new Date('2025-09-05'),
      paciente: 'María Gómez',
      medico: 'Dra. López',
      usuario: 'Recepción',
      estado: 'Pendiente',
      fechaVencimiento: new Date('2025-10-05')
    },
    {
      id: 3,
      fechaElaboracion: new Date('2025-09-10'),
      paciente: 'Carlos Sánchez',
      medico: 'Dr. Ortega',
      usuario: 'Admin',
      estado: 'Aprobado',
      fechaVencimiento: new Date('2025-10-10')
    }
  ];

  filtro: string = '';
  displayedColumns: string[] = [
    'id',
    'fechaElaboracion',
    'paciente',
    'medico',
    'usuario',
    'estado',
    'fechaVencimiento',
    'acciones'
  ];

  presupuestosFiltrados: Presupuesto[] = [];

  resumen = [
    { titulo: 'Total Presupuestos', valor: 0, icono: 'description' },
    { titulo: 'Aprobados', valor: 0, icono: 'check_circle' },
    { titulo: 'Pendientes', valor: 0, icono: 'hourglass_empty' }
  ];
nuevoPresupuesto() {
  this.router.navigate(['/presupuestos/nuevo']);
}


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.presupuestosFiltrados = [...this.presupuestos];
    this.actualizarResumen();
  }

  aplicarFiltro() {
    const texto = this.filtro.toLowerCase();
    this.presupuestosFiltrados = this.presupuestos.filter(p =>
      p.paciente.toLowerCase().includes(texto) ||
      p.medico.toLowerCase().includes(texto) ||
      p.usuario.toLowerCase().includes(texto) ||
      p.estado.toLowerCase().includes(texto)
    );
  }

  actualizarResumen() {
    this.resumen[0].valor = this.presupuestos.length;
    this.resumen[1].valor = this.presupuestos.filter(p => p.estado === 'Aprobado').length;
    this.resumen[2].valor = this.presupuestos.filter(p => p.estado === 'Pendiente').length;
  }

  editarPresupuesto(id: number) {
  this.router.navigate(['/presupuestos/editar', id]);
}

  eliminarPresupuesto(id: number) {
    this.presupuestos = this.presupuestos.filter(p => p.id !== id);
    this.presupuestosFiltrados = [...this.presupuestos];
    this.actualizarResumen();
  }
}
