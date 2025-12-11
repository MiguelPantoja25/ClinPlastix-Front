import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Fechas
  fechaInicio: string = '';
  fechaFin: string = '';

  // Tarjetas superiores
  citas = 14;
  cirugias = 4;

  // Series de las gráficas
  ingresosSeries: ApexAxisChartSeries = [
    { name: "Ingresos", data: [10, 22, 15, 30, 28] }
  ];

  egresosSeries: ApexAxisChartSeries = [
    { name: "Egresos", data: [5, 10, 12, 18, 16] }
  ];

  // Opciones gráficas
  ingresosOptions = {
    chart: { type: 'line', height: 260 } as ApexChart,
    xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] } as ApexXAxis,
    dataLabels: { enabled: false } as ApexDataLabels,
    stroke: { curve: 'smooth', width: 4 } as ApexStroke
  };

  egresosOptions = {
    chart: { type: 'line', height: 260 } as ApexChart,
    xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] } as ApexXAxis,
    dataLabels: { enabled: false } as ApexDataLabels,
    stroke: { curve: 'smooth', width: 4 } as ApexStroke
  };

  ngOnInit(): void {}

  buscar() {
    console.log("Buscando desde:", this.fechaInicio, "hasta:", this.fechaFin);
  }

  descargar() {
    const contenido = "Tipo,Valores\nIngresos,10|22|15|30|28\nEgresos,5|10|12|18|16";
    const blob = new Blob([contenido], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos-dashboard.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
