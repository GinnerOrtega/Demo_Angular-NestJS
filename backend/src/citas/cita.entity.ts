import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { Medico } from '../medicos/medico.entity.js';

/** Relación N:1 con Medico (un médico tiene muchas citas). */
@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  paciente: string;

  @Column({ length: 20 })
  documento: string;

  @Column({ type: 'date' })
  fecha: string; // formato AAAA-MM-DD

  @Column({ length: 5 })
  hora: string; // formato HH:mm

  @Column({ length: 200, nullable: true })
  motivo?: string;

  @ManyToOne(() => Medico, { eager: true, nullable: false })
  medico: Relation<Medico>;
}
