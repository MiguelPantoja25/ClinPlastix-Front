import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss']
})
export class CitasFormComponent implements OnInit{

filtro: string = '';
  citas: any[] = [];
  citasFiltradas: any[] = [];

  resumen = [
    { titulo: 'Programada', valor: 0, icono: 'event' },
    { titulo: 'Confirmada', valor: 0, icono: 'check_circle' },
    { titulo: 'Por confirmar', valor: 0, icono: 'help' },
    { titulo: 'Cancelada', valor: 0, icono: 'cancel' },
    { titulo: 'No asistió', valor: 0, icono: 'block' },
    { titulo: 'Finalizada', valor: 0, icono: 'done_all' },
    { titulo: 'Procedimiento programado', valor: 0, icono: 'medical_services' },
    { titulo: 'Cirugía', valor: 0, icono: 'healing' },
    { titulo: 'PosOperatoria', valor: 0, icono: 'favorite' }
  ];

  displayedColumns: string[] = [
    'id',
    'paciente',
    'numeroPaciente',
    'doctor',
    'status',
    'fecha',
    'acciones'
  ];

  constructor() {}

  ngOnInit(): void {
    this.citas = [
      { id: 1, paciente: 'Juan Pérez', numeroPaciente: 'P001', doctor: 'Dr. Ramírez', status: 'Programada', fecha: new Date() },
      { id: 2, paciente: 'María López', numeroPaciente: 'P002', doctor: 'Dra. González', status: 'Confirmada', fecha: new Date('2025-10-05 09:00') },
      { id: 3, paciente: 'Carlos Sánchez', numeroPaciente: 'P003', doctor: 'Dr. Herrera', status: 'Cancelada', fecha: new Date('2025-10-06 11:30') },
      { id: 4, paciente: 'Ana Torres', numeroPaciente: 'P004', doctor: 'Dr. Morales', status: 'Finalizada', fecha: new Date('2025-09-30 14:00') }
    ];

    this.citasFiltradas = [...this.citas];
  }

  aplicarFiltro(): void {
    const texto = this.filtro.toLowerCase();
    this.citasFiltradas = this.citas.filter(c =>
      c.paciente.toLowerCase().includes(texto) ||
      c.doctor.toLowerCase().includes(texto) ||
      c.status.toLowerCase().includes(texto)
    );
  }

  NuevaCita(): void {
    console.log('Abrir formulario para nueva cita');
  }

  editar(id: number): void {
    console.log('Editar cita con id:', id);
  }

eliminar(id: number) {
  console.log('Eliminar cita con ID:', id);
}
}
