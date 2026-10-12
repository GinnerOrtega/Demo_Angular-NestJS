import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

/** DTO: datos que llegan del cliente para crear un médico (validados). */
export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  especialidad: string;

  @IsEmail()
  correo: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
