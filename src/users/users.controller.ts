import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Controller de Usuários
 * 
 * Gerencia endpoints CRUD para usuários do sistema.
 * Base URL: /users
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Cria um novo usuário
   * @param createUserDto - Dados do usuário (nome, email, senha)
   * @returns Usuário criado (sem senha)
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Lista todos os usuários cadastrados
   * @returns Array de usuários (sem senhas)
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Busca um usuário específico por ID
   * @param id - ID do usuário
   * @returns Usuário encontrado (sem senha) ou null
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  /**
   * Atualiza dados de um usuário
   * @param id - ID do usuário
   * @param updateUserDto - Dados a serem atualizados
   * @returns Usuário atualizado (sem senha)
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Remove um usuário do sistema
   * @param id - ID do usuário a ser removido
   * @returns Usuário removido
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
