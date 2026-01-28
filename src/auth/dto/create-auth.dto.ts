/**
 * DTO para autenticação (Login)
 * 
 * Define as credenciais necessárias para login:
 * - email: Email do usuário cadastrado
 * - password: Senha em texto plano (será comparada com hash)
 */
export class CreateAuthDto {
    /** Email do usuário para autenticação */
    email: string;
    
    /** Senha do usuário (será validada com bcrypt) */
    password: string;
}
