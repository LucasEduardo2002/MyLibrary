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
    return await this.usersService.create(createUserDto);
  }

  /**
   * Lista todos os usuários cadastrados
   * @returns Array de usuários (sem senhas)
   */
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  /**
   * Busca um usuário específico por ID
   * @param id - ID do usuário
   * @returns Usuário encontrado (sem senha) ou null
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  /**
   * Atualiza dados de um usuário
   * @param id - ID do usuário
   * @param updateUserDto - Dados a serem atualizados
   * @returns Usuário atualizado (sem senha)
   */
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  /**
   * Remove um usuário do sistema
   * @param id - ID do usuário a ser removido
   * @returns Usuário removido
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
