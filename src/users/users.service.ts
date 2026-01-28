import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

/**
 * Serviço de Gerenciamento de Usuários
 * 
 * Responsável por toda a lógica de negócio relacionada a usuários:
 * - Validação de emails duplicados
 * - Hash de senhas usando bcrypt
 * - Operações CRUD no banco de dados
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo usuário no sistema
   * 
   * @param createUserDto - Dados do novo usuário
   * @returns Usuário criado com senha hasheada
   * @throws Error se o email já estiver em uso
   */
  async create(createUserDto: CreateUserDto) {
     const verifiedEmail = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (verifiedEmail) {
      throw new Error('Email already in use');
    }
    
    // Hash da senha com bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  /**
   * Busca um usuário por email
   * Utilizado principalmente para autenticação
   * 
   * @param email - Email do usuário
   * @returns Usuário encontrado (incluindo senha) ou null
   */
  async findByEmail(email: string) {
      return this.prisma.user.findUnique({ where: { email } });
    }

  /**
   * Lista todos os usuários cadastrados
   * @returns Array com todos os usuários
   */
  async findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Busca um usuário específico por ID
   * @param id - ID do usuário
   * @returns Usuário encontrado ou null
   */
  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Atualiza dados de um usuário
   * @param id - ID do usuário a ser atualizado
   * @param updateUserDto - Dados para atualização
   * @returns Usuário atualizado
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  /**
   * Remove um usuário do sistema
   * @param id - ID do usuário a ser removido
   * @returns Usuário removido
   */
  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
