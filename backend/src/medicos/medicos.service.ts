import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from '../citas/cita.entity.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { Medico } from './medico.entity.js';

@Injectable()
export class MedicosService implements OnModuleInit {
  constructor(
    @InjectRepository(Medico) private readonly medicos: Repository<Medico>,
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
  ) {}

  /** Datos de ejemplo */
  async onModuleInit() {
    if ((await this.medicos.count()) === 0) {
      await this.medicos.save([
        { nombre: 'Laura Méndez', especialidad: 'Medicina general', correo: 'laura.mendez@piedrazul.co' },
        { nombre: 'Andrés Ruiz', especialidad: 'Pediatría', correo: 'andres.ruiz@piedrazul.co' },
      ]);
    }
  }

  findAll() {
    return this.medicos.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const medico = await this.medicos.findOneBy({ id });
    if (!medico) throw new NotFoundException(`No existe el médico ${id}`);
    return medico;
  }

  async create(dto: CreateMedicoDto) {
    await this.validarCorreoUnico(dto.correo);
    return this.medicos.save(this.medicos.create(dto));
  }

  async update(id: number, dto: UpdateMedicoDto) {
    const medico = await this.findOne(id);
    if (dto.correo && dto.correo !== medico.correo) await this.validarCorreoUnico(dto.correo);
    Object.assign(medico, dto);
    return this.medicos.save(medico);
  }

  async remove(id: number) {
    const medico = await this.findOne(id);
    // No se elimina un médico con citas agendadas
    const citas = await this.citas.countBy({ medico: { id } });
    if (citas > 0) {
      throw new ConflictException(`El médico tiene ${citas} cita(s); elimínelas o reasígnelas primero`);
    }
    await this.medicos.remove(medico);
  }

  private async validarCorreoUnico(correo: string) {
    if (await this.medicos.existsBy({ correo })) {
      throw new ConflictException(`Ya existe un médico con el correo ${correo}`);
    }
  }
}
