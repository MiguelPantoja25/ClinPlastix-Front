export interface Paciente {
    id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  estatus: 'valoracion' | 'presupuesto' | 'espera' | 'post' | 'no-atendido';
  fechaNacimiento?: string; // opcional
  genero?: 'M' | 'F' | 'Otro'; // opcional
}
