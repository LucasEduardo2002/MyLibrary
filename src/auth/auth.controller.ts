import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Controller de Autenticação
 * 
 * Gerencia endpoints de login e autenticação de usuários.
 * Base URL: /auth
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint de Login
   * Valida credenciais do usuário e retorna token JWT
   * 
   * @param createAuthDto - Credenciais de login (email e senha)
   * @returns Token JWT e dados do usuário autenticado
   * @throws Error se as credenciais forem inválidas
   */
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.validateUser(createAuthDto.email, createAuthDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

}
