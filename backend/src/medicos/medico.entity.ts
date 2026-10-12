import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  nombre: string;

  @Column({ length: 60 })
  especialidad: string;

  @Column({ length: 120, unique: true })
  correo: string;

  @Column({ default: true })
  activo: boolean;
}
