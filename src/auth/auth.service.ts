import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Serviço de Autenticação
 * 
 * Gerencia a lógica de autenticação via JWT:
 * - Validação de credenciais de usuário
 * - Geração de tokens JWT
 * - Verificação de senhas com bcrypt
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Valida as credenciais do usuário
   * 
   * @param email - Email do usuário
   * @param pass - Senha em texto plano
   * @returns Dados do usuário (sem senha) se válido, null caso contrário
   */
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // Remove a senha do objeto retornado por segurança
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Gera token JWT para usuário autenticado
   * 
   * @param user - Dados do usuário autenticado
   * @returns Objeto contendo o token de acesso JWT
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

