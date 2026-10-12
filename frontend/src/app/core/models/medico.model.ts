export interface Medico {
  id: number;
  nombre: string;
  especialidad: string;
  correo: string;
  activo: boolean;
}

export type MedicoPayload = Omit<Medico, 'id'>;
