import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Egreso {
  id: number;
  nombre: string;
  fecha: Date;
  concepto: string;
  metodo: string;
  monto: number;
}

@Component({
  selector: 'app-egresos-list',
  templateUrl: './egresos-list.component.html',
  styleUrls: ['./egresos-list.component.scss']
})
export class EgresosListComponent implements OnInit {

  constructor(private router: Router) {}

  egresos: Egreso[] = [];
  egresosFiltrados: Egreso[] = [];
  filtro: string = '';

  displayedColumns: string[] = [
    'id',
    'nombre',
    'fecha',
    'concepto',
    'metodo',
    'monto',
    'acciones'
  ];

  resumen = [
    { titulo: 'Total Egresos', valor: 0, icono: 'payments' },
    { titulo: 'Confirmados', valor: 0, icono: 'attach_money' },
    { titulo: 'Pendientes', valor: 0, icono: 'hourglass_bottom' }
  ];

  ngOnInit(): void {
    this.cargarMockEgresos();
    this.aplicarFiltro();
    this.calcularResumen();
  }

  cargarMockEgresos(): void {
    this.egresos = [
      {
        id: 1,
        nombre: 'Compra de material',
        fecha: new Date('2025-10-18'),
        concepto: 'Material médico',
        metodo: 'Efectivo',
        monto: 850
      },
      {
        id: 2,
        nombre: 'Pago laboratorio',
        fecha: new Date('2025-10-19'),
        concepto: 'Servicios',
        metodo: 'Tarjeta',
        monto: 595
      },
      {
        id: 3,
        nombre: 'Farmacia',
        fecha: new Date('2025-10-20'),
        concepto: 'Medicinas',
        metodo: 'Transferencia',
        monto: 255
      }
    ];
  }

  aplicarFiltro(): void {
    const texto = this.filtro.toLowerCase();

    this.egresosFiltrados = this.egresos.filter(e =>
      e.nombre.toLowerCase().includes(texto) ||
      e.concepto.toLowerCase().includes(texto)
    );
  }

  calcularResumen(): void {
    const total = this.egresos.reduce((s, e) => s + e.monto, 0);

    this.resumen = [
      { titulo: 'Total Egresos', valor: total, icono: 'payments' },
      { titulo: 'Confirmados', valor: total * 0.70, icono: 'attach_money' },
      { titulo: 'Pendientes', valor: total * 0.30, icono: 'hourglass_bottom' }
    ];
  }

  nuevoEgreso(): void {
    this.router.navigate(['/egresos/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/egresos/editar', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este egreso?')) {
      this.egresos = this.egresos.filter(e => e.id !== id);
      this.aplicarFiltro();
      this.calcularResumen();
    }
  }
}
