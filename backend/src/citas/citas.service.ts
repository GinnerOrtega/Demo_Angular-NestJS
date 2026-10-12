import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { MedicosService } from '../medicos/medicos.service.js';
import { Cita } from './cita.entity.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita) private readonly citas: Repository<Cita>,
    private readonly medicosService: MedicosService, // inyección de dependencias entre módulos
  ) {}

  findAll() {
    return this.citas.find({ order: { fecha: 'ASC', hora: 'ASC' } });
  }

  async findOne(id: number) {
    const cita = await this.citas.findOneBy({ id });
    if (!cita) throw new NotFoundException(`No existe la cita ${id}`);
    return cita;
  }

  async create(dto: CreateCitaDto) {
    const { medicoId, ...datos } = dto;
    const medico = await this.medicosService.findOne(medicoId);
    await this.validarDisponibilidad(medicoId, dto.fecha, dto.hora);
    return this.citas.save(this.citas.create({ ...datos, medico }));
  }

  async update(id: number, dto: UpdateCitaDto) {
    const cita = await this.findOne(id);
    const { medicoId, ...datos } = dto;
    if (medicoId !== undefined) cita.medico = await this.medicosService.findOne(medicoId);
    Object.assign(cita, datos);
    await this.validarDisponibilidad(cita.medico.id, cita.fecha, cita.hora, id);
    return this.citas.save(cita);
  }

  async remove(id: number) {
    await this.citas.remove(await this.findOne(id));
  }

  /** Un médico no puede tener dos citas a la misma fecha y hora. */
  private async validarDisponibilidad(medicoId: number, fecha: string, hora: string, excluirId?: number) {
    const ocupada = await this.citas.existsBy({
      medico: { id: medicoId },
      fecha,
      hora,
      ...(excluirId ? { id: Not(excluirId) } : {}),
    });
    if (ocupada) throw new ConflictException('El médico ya tiene una cita en esa fecha y hora');
  }
}
