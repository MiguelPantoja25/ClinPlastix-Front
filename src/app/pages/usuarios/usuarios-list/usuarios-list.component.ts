import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioTabla } from '../../../models/usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss'
})
export class UsuariosListComponent implements OnInit {
constructor(private router: Router) {}
filtro: string = '';
resumen = [
    { titulo: 'Total Usuarios', valor: 0, icono: 'group' },
    { titulo: 'Doctor', valor: 0, icono: 'medical_services' },
    { titulo: 'Recepcionista', valor: 0, icono: 'support_agent' },
    { titulo: 'Enfermeria', valor: 0, icono: 'vaccines' },
    { titulo: 'Contabilidad', valor: 0, icono: 'account_balance' }
  ];
  usuarios: UsuarioTabla[] = [];
  usuariosFiltrados: UsuarioTabla[] = [];
displayedColumns: string[] = ['id','userName', 'nombre', 'telefono','rol', 'estadoUsuario', 'acciones'];
 ngOnInit(): void {
    this.cargarMockUsuarios();
    this.aplicarFiltro();
    this.calcularResumen();
  }

  cargarMockUsuarios(): void {
    this.usuarios = [
      {
        id: '1',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        telefono: '555-1234',
        email: 'juan.perez@example.com',
        userName: 'juanp',
        estadoUsuario: 'activo',
        rol: 'Doctor'
      },
      {
        id: '2',
        nombre: 'Ana',
        apellidoPaterno: 'Gómez',
        telefono: '555-5678',
        email: 'ana.gomez@example.com',
        userName: 'anag',
        estadoUsuario: 'inactivo',
        rol: 'Recepcionista'
      },
      {
        id: '3',
        nombre: 'Luis',
        apellidoPaterno: 'Ramírez',
        telefono: '555-7890',
        email: 'luis.ramirez@example.com',
        userName: 'luisr',
        estadoUsuario: 'activo',
        rol: 'Enfermeria'
      },
      {
        id: '4',
        nombre: 'Marta',
        apellidoPaterno: 'López',
        telefono: '555-2345',
        email: 'marta.lopez@example.com',
        userName: 'martal',
        estadoUsuario: 'inactivo',
        rol: 'Contabilidad'
      },{
        id: '5',
        nombre: 'Carlos',
        apellidoPaterno: 'Díaz',
        telefono: '555-3456',
        email: 'carlos.diaz@example.com',
        userName: 'carlosd',
        estadoUsuario: 'activo',
        rol: 'Contabilidad'
      },{
        id: '6',
        nombre: 'Elena',
        apellidoPaterno: 'Fernández',
        telefono: '555-4567',
        email: 'elena.fernandez@example.com',
        userName: 'elenaf',
        estadoUsuario: 'activo',
        rol: 'Enfermeria'
      },{
        id: '7',
        nombre: 'Pedro',
        apellidoPaterno: 'García',
        telefono: '555-5678',
        email: 'pedro.garcia@example.com',
        userName: 'pedrog',
        estadoUsuario: 'activo',
        rol: 'Recepcionista'
      },{
        id: '8',
        nombre: 'Laura',
        apellidoPaterno: 'Martínez',
        telefono: '555-6789',
        email: 'laura.martinez@example.com',
        userName: 'lauram',
        estadoUsuario: 'activo',
        rol: 'Doctor'
      }
    ];
  }
  calcularResumen(): void {
    const contador = {
      total: this.usuarios.length,
      doctor: 0,
      recepcionista: 0,
      enfermeria: 0,
      contabilidad: 0
    };

    for (const u of this.usuarios) {
      switch (u.rol) {
        case 'Doctor': contador.doctor++; break;
        case 'Recepcionista': contador.recepcionista++; break;
        case 'Enfermeria': contador.enfermeria++; break;
        case 'Contabilidad': contador.contabilidad++; break;
      }
    }

    this.resumen = [
      { titulo: 'Total Usuarios', valor: contador.total, icono: 'group' },
      { titulo: 'Doctor', valor: contador.doctor, icono: 'medical_services' },
      { titulo: 'Recepcionista', valor: contador.recepcionista, icono: 'support_agent' },
      { titulo: 'Enfermeria', valor: contador.enfermeria, icono: 'vaccines' },
      { titulo: 'Contabilidad', valor: contador.contabilidad, icono: 'account_balance' }
    ];
  }

  aplicarFiltro(): void {
    debugger;
    const texto = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(texto) ||
      u.apellidoPaterno.toLowerCase().includes(texto)
    );
  }

  editar(id: number): void {
    console.log('Editar usuario con ID:', id);
  this.router.navigate(['/usuarios/editar', id]);
  }

  eliminar(id: string): void {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.calcularResumen();
      this.aplicarFiltro();
    }
  }

  NuevoUsuario(): void {
    console.log('Crear nuevo usuario');
  this.router.navigate(['/usuarios/nuevo']);
  }
}
