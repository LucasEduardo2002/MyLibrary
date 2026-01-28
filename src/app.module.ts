import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

/**
 * Módulo raiz da aplicação MyLibrary API
 * 
 * Responsável por orquestrar todos os módulos da aplicação:
 * - PrismaModule: Gerenciamento de conexão com banco de dados
 * - UsersModule: Gerenciamento de usuários
 * - BooksModule: Gerenciamento de livros
 * - AuthModule: Autenticação e autorização
 */
@Module({
  imports: [PrismaModule, UsersModule, BooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
