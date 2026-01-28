import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // Conecta ao banco assim que o módulo inicia
  async onModuleInit() {
    await this.$connect();
  }

  // Fecha a conexão quando a aplicação desliga
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
