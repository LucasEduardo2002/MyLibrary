import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

/**
 * Módulo de Livros
 * 
 * Gerencia a biblioteca pessoal de cada usuário:
 * - Cadastro, listagem, atualização e remoção de livros
 * - Todas as rotas protegidas por autenticação JWT
 * - Livros vinculados ao usuário autenticado
 */
@Module({
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
