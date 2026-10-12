import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasModule } from './citas/citas.module.js';
import { Cita } from './citas/cita.entity.js';
import { MedicosModule } from './medicos/medicos.module.js';
import { Medico } from './medicos/medico.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'piedrazul.sqlite',
      autoSave: true,
      entities: [Medico, Cita],
      synchronize: true,
    }),
    MedicosModule,
    CitasModule,
  ],
})
export class AppModule {}
