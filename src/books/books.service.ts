import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Serviço de Gerenciamento de Livros
 * 
 * Responsável pela lógica de negócio da biblioteca pessoal:
 * - Cadastro e gerenciamento de livros
 * - Validação de propriedade (usuário pode modificar apenas seus livros)
 * - Integração com banco de dados via Prisma
 */
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  /**
   * Adiciona um novo livro à biblioteca do usuário
   * 
   * @param createBookDto - Dados do livro a ser criado
   * @param userId - ID do usuário proprietário
   * @returns Livro criado
   */
  async create(createBookDto: CreateBookDto, userId: number) {
    return this.prisma.book.create({
      data: {
        name: createBookDto.name,
        bookGenres: createBookDto.bookGenres,
        author: createBookDto.author,
        pages: createBookDto.pages,
        userId: userId,
      },
    })
  }

  /**
   * Lista todos os livros de um usuário específico
   * 
   * @param userId - ID do usuário
   * @returns Array de livros do usuário
   */
  findAllByUser(userId: number) {
    return this.prisma.book.findMany({
      where: { userId: userId },
    });
  }

  /**
   * Remove um livro da biblioteca
   * Valida se o livro pertence ao usuário antes de remover
   * 
   * @param id - ID do livro
   * @param userId - ID do usuário solicitante
   * @returns Livro removido
   * @throws Error se o livro não for encontrado ou não pertencer ao usuário
   */
  async remove(id: number, userId: number) {
    const book = await this.prisma.book.findUnique({
      where: { id: id },
    });
    
    if (!book) {
      throw new Error("Book not found.");
    }
    
    if (userId !== book.userId) {
      throw new Error("You do not have permission to delete this book.");
    }
    
    return this.prisma.book.delete({
      where: { id: id },
    });
  }

  /**
   * Atualiza informações de um livro
   * Valida se o livro pertence ao usuário antes de atualizar
   * 
   * @param id - ID do livro
   * @param userId - ID do usuário solicitante
   * @param updateBookDto - Dados a serem atualizados
   * @returns Livro atualizado
   * @throws Error se o livro não for encontrado ou não pertencer ao usuário
   */
  async update(id: number, userId: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: id },    
    });
    
    if (!book) {
      throw new Error("Book not found.");
    }
    
    if (userId !== book.userId) {
      throw new Error("You do not have permission to update this book.");
    }
    
    return this.prisma.book.update({
      where: { id: id },
      data: {
        ...updateBookDto,
      },
    });
  }
}
