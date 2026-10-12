import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() dto: CreateCitaDto) {
    return this.citasService.create(dto);
  }

  @Get()
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCitaDto) {
    return this.citasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.citasService.remove(id);
  }
}
