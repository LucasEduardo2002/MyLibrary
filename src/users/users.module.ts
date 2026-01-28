import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Módulo de Usuários
 * 
 * Gerencia todas as operações relacionadas a usuários:
 * - CRUD completo de usuários
 * - Exporta UsersService para uso em outros módulos (ex: AuthModule)
 * - Integração com Prisma para persistência de dados
 */
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
