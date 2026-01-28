import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo Global do Prisma
 * 
 * Fornece acesso ao PrismaService em toda a aplicação:
 * - Marcado como @Global() para estar disponível em todos os módulos
 * - Gerencia conexão com banco de dados MySQL
 * - Exporta PrismaService para uso em services de toda aplicação
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
