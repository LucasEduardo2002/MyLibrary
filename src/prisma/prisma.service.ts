import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Serviço de Gerenciamento do Prisma ORM
 * 
 * Estende o PrismaClient para integração com NestJS:
 * - Conecta automaticamente ao banco de dados na inicialização do módulo
 * - Desconecta gracefully quando a aplicação é encerrada
 * - Fornece acesso a todos os models (User, Book) via herança
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  /**
   * Conecta ao banco de dados assim que o módulo é inicializado
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Fecha a conexão com o banco de dados quando a aplicação é desligada
   * Garante que não há conexões pendentes
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
