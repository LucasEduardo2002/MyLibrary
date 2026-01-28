import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller de Livros
 * 
 * Gerencia a biblioteca pessoal do usuário autenticado.
 * Todas as rotas requerem autenticação JWT.
 * Base URL: /books
 */
@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Adiciona um novo livro à biblioteca do usuário
   * @param req - Request contendo dados do usuário autenticado
   * @param createBookDto - Dados do livro a ser adicionado
   * @returns Livro criado
   */
  @Post()
  async create(@Request() req, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto, req.user.userId);
  }

  /**
   * Lista todos os livros do usuário autenticado
   * @param req - Request contendo dados do usuário autenticado
   * @returns Array de livros do usuário
   */
  @Get('me')
  findAll(@Request() req) {
    return this.booksService.findAllByUser(req.user.userId);
  }

  /**
   * Remove um livro da biblioteca do usuário
   * @param req - Request contendo dados do usuário autenticado
   * @param id - ID do livro a ser removido
   * @returns Livro removido
   */
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.booksService.remove(+id, req.user.userId);
  }

  /**
   * Atualiza informações de um livro
   * @param req - Request contendo dados do usuário autenticado
   * @param id - ID do livro a ser atualizado
   * @param updateBookDto - Dados a serem atualizados
   * @returns Livro atualizado
   */
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, req.user.userId, updateBookDto);
  }
}
