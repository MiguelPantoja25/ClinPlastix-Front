import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  estatus: 'valoracion' | 'presupuesto' | 'espera' | 'post' | 'no-atendido';
}

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent implements OnInit {
constructor(private router: Router) {}


  pacientes: Paciente[] = [];
  filtro: string = '';
  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'estatus', 'acciones'];
  pacientesFiltrados: Paciente[] = [];
  resumen = [
    { titulo: 'Total Pacientes', valor: 0, icono: 'group' },
    { titulo: 'Valoración', valor: 0, icono: 'assignment' },
    { titulo: 'Con Presupuesto', valor: 0, icono: 'request_quote' },
    { titulo: 'Espera Cirugía', valor: 0, icono: 'schedule' },
    { titulo: 'Consulta Post', valor: 0, icono: 'healing' },
    { titulo: 'No Atendidos', valor: 0, icono: 'remove_circle_outline' }
  ];
  ngOnInit(): void {
    this.cargarMockPacientes();
    this.aplicarFiltro();
    this.calcularResumen();
  }
  cargarMockPacientes(): void {
    this.pacientes = [
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        telefono: '555-1234',
        correo: 'juan.perez@example.com',
        estatus: 'valoracion'
      },
      {
        id: 2,
        nombre: 'Ana',
        apellido: 'Gómez',
        telefono: '555-5678',
        correo: 'ana.gomez@example.com',
        estatus: 'presupuesto'
      },
      {
        id: 3,
        nombre: 'Luis',
        apellido: 'Ramírez',
        telefono: '555-7890',
        correo: 'luis.ramirez@example.com',
        estatus: 'espera'
      },
      {
        id: 4,
        nombre: 'Marta',
        apellido: 'López',
        telefono: '555-2345',
        correo: 'marta.lopez@example.com',
        estatus: 'post'
      },
      {
        id: 5,
        nombre: 'Carlos',
        apellido: 'Díaz',
        telefono: '555-3456',
        correo: 'carlos.diaz@example.com',
        estatus: 'no-atendido'
      },
      {
        id: 6,
        nombre: 'Elena',
        apellido: 'Fernández',
        telefono: '555-4567',
        correo: 'elena.fernandez@example.com',
        estatus: 'valoracion'
      }
    ];
  }

  calcularResumen(): void {
    const contador = {
      total: this.pacientes.length,
      valoracion: 0,
      presupuesto: 0,
      espera: 0,
      post: 0,
      noAtendido: 0
    };

    for (const p of this.pacientes) {
      switch (p.estatus) {
        case 'valoracion': contador.valoracion++; break;
        case 'presupuesto': contador.presupuesto++; break;
        case 'espera': contador.espera++; break;
        case 'post': contador.post++; break;
        case 'no-atendido': contador.noAtendido++; break;
      }
    }

    this.resumen = [
      { titulo: 'Total Pacientes', valor: contador.total, icono: 'group' },
      { titulo: 'Valoración', valor: contador.valoracion, icono: 'assignment' },
      { titulo: 'Con Presupuesto', valor: contador.presupuesto, icono: 'request_quote' },
      { titulo: 'Espera Cirugía', valor: contador.espera, icono: 'schedule' },
      { titulo: 'Consulta Post', valor: contador.post, icono: 'healing' },
      { titulo: 'No Atendidos', valor: contador.noAtendido, icono: 'remove_circle_outline' }
    ];
  }

  aplicarFiltro(): void {
    const texto = this.filtro.toLowerCase();
    this.pacientesFiltrados = this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto)
    );
  }

  editar(id: number): void {
    console.log('Editar paciente con ID:', id);
  this.router.navigate(['/pacientes/editar', id]);
  }

  //eliminar(id: number): void {
  //  if (confirm('¿Deseas eliminar este paciente?')) {
  //    this.pacientes = this.pacientes.filter(p => p.id !== id);
  //    this.calcularResumen();
  //  }
  //}
  eliminar(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar este paciente?',
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
    if (result.isConfirmed) {
      this.pacientes = this.pacientes.filter(p => p.id !== id);
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

  NuevoPaciente(): void {
    console.log('Crear nuevo paciente');
  this.router.navigate(['/pacientes/nuevo']);
  }
}
