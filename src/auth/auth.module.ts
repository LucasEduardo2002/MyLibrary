import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

/**
 * Módulo de Autenticação
 * 
 * Responsável por gerenciar a autenticação de usuários via JWT:
 * - Login de usuários com email e senha
 * - Geração de tokens JWT com validade de 7 dias
 * - Validação de tokens através do JwtStrategy
 * - Integração com UsersModule para validação de credenciais
 */
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
