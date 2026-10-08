import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, HttpCode } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetosService.create(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetosService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjetoDto,
  ) {
    return this.projetosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content: sucesso sem corpo na resposta
  remove(@Param('id', ParseIntPipe) id: number) {
    this.projetosService.remove(id);
  }
}
