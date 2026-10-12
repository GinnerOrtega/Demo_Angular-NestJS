import { Medico } from './medico.model';

export interface Cita {
  id: number;
  paciente: string;
  documento: string;
  fecha: string;
  hora: string;
  motivo?: string;
  medico: Medico;
}

export interface CitaPayload {
  paciente: string;
  documento: string;
  fecha: string;
  hora: string;
  motivo?: string;
  medicoId: number;
}
