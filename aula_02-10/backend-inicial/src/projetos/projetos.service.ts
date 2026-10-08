import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {

  private projetos: Projeto[] = [
    { id: 1, nome: 'Estudar NestJS', descricao: 'Módulos, controllers e services', cor: 'azul' },
    { id: 2, nome: 'Preparar a aula de hoje', descricao: 'Preparar slides e materiais', cor: 'verde' },
  ];

  private proximoId = 3;

  create(dto: CreateProjetoDto) {
    const novoProjeto: Projeto = {
      id: this.proximoId++,
      nome: dto.nome,
      descricao: dto.descricao,
      cor: dto.cor
    };
    this.projetos.push(novoProjeto);
    return novoProjeto;
  }

  findAll() {
    return this.projetos;
  }

  findOne(id: number) {
    const projeto = this.projetos.find(p => p.id === id);
    if (!projeto) {
      // NotFoundException vira automaticamente uma resposta HTTP 404.
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const projeto = this.findOne(id);
    Object.assign(projeto, updateProjetoDto);
    return projeto;
  }

  remove(id: number) {
    const projeto = this.findOne(id);
    this.projetos = this.projetos.filter(p => p.id !== id);
    return "removido com sucesso!";
  }
}
