import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Pago {
  idPago: number;
  nombre: string;
  fecha: Date;
  concepto: string;
  metodoPago: string;
  monto: number;
}

@Component({
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.component.html',
  styleUrls: ['./pagos-list.component.scss']
})
export class PagosListComponent implements OnInit {
  filtro: string = '';
  pagos: Pago[] = [];
  pagosFiltrados: Pago[] = [];

  displayedColumns: string[] = [
    'idPago',
    'nombre',
    'fecha',
    'concepto',
    'metodoPago',
    'monto',
    'acciones'
  ];

  resumen = [
    { icono: 'payments', valor: '$12,500', titulo: 'Total recibido' },
    { icono: 'attach_money', valor: '$8,200', titulo: 'Pagos confirmados' },
    { icono: 'hourglass_bottom', valor: '$4,300', titulo: 'Pendientes' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pagos = [
      {
        idPago: 1,
        nombre: 'Juan Pérez',
        fecha: new Date('2025-10-18'),
        concepto: 'Consulta médica',
        metodoPago: 'Efectivo',
        monto: 500
      },
      {
        idPago: 2,
        nombre: 'Ana López',
        fecha: new Date('2025-10-19'),
        concepto: 'Medicamento',
        metodoPago: 'Tarjeta',
        monto: 350
      }
    ];
    this.pagosFiltrados = this.pagos;
  }

  aplicarFiltro(): void {
    const texto = this.filtro.toLowerCase();
    this.pagosFiltrados = this.pagos.filter(
      p =>
        p.nombre.toLowerCase().includes(texto) ||
        p.concepto.toLowerCase().includes(texto)
    );
  }

  nuevoPago(): void {
    this.router.navigate(['/pagos/nuevo']);
  }

  editar(id: number): void {
    alert(`Editar pago con ID: ${id}`);
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este pago?')) {
      this.pagos = this.pagos.filter(p => p.idPago !== id);
      this.aplicarFiltro();
    }
  }
}
