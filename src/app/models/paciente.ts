export interface Paciente {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  email: string;
  curp: string;

  calleNumero: string;
  colonia: string;
  cp: string;
  municipio: string;
  estado: string;

  tipoSangre: string;
  alergias: string;
  padecimientos: string;
  medicamentos: string;

  emergenciaNombre: string;
  emergenciaRelacion: string;
  emergenciaTelefono: string;

  aseguradora: string;
  poliza: string;
  vigenciaDesde: string;
  vigenciaHasta: string;

  rfc: string;
  factRazonSocial: string;
  factUsoCfdi: string;
  factCalleNumero: string;
  factColonia: string;
  factCp: string;
  factMunicipio: string;
  factEstado: string;

  aceptaAvisoPrivacidad: boolean;
}
