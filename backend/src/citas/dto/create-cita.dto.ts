import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCitaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  paciente: string;

  @IsString()
  @Matches(/^\d{5,20}$/, { message: 'documento debe tener solo dígitos (5 a 20)' })
  documento: string;

  @IsDateString()
  fecha: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'hora debe tener formato HH:mm' })
  hora: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  motivo?: string;

  @IsInt()
  medicoId: number;
}
