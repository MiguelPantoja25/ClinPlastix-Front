export interface Usuario {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
    sexo: string;
    telefono: string;
    email: string;
    curp: string;
    userName: string;
    password: string;
    estadoUsuario: string;
    rol: string;
    calleNumero: string;
    colonia: string;
    cp: string;
    municipio: string;
    estado: string;
}

export interface UsuarioTabla {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    telefono: string;
    email: string;
    userName: string;
    estadoUsuario: string;
    rol: string;
}