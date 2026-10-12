import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto.js';

/** Para actualizar, todos los campos son opcionales. */
export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {}
