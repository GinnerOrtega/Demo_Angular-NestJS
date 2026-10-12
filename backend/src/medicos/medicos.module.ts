import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from '../citas/cita.entity.js';
import { Medico } from './medico.entity.js';
import { MedicosController } from './medicos.controller.js';
import { MedicosService } from './medicos.service.js';

/** Agrupa todo lo de médicos (controlador + servicio + repositorios). */
@Module({
  imports: [TypeOrmModule.forFeature([Medico, Cita])],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [MedicosService],
})
export class MedicosModule {}
