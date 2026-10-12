import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicosModule } from '../medicos/medicos.module.js';
import { Cita } from './cita.entity.js';
import { CitasController } from './citas.controller.js';
import { CitasService } from './citas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cita]), MedicosModule],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
