/**
 * DTO para criação de novo usuário
 * 
 * Define os campos necessários para criar um usuário:
 * - name: Nome completo do usuário
 * - email: Email único para login
 * - password: Senha em texto plano (será hasheada no service)
 */
export class CreateUserDto {
    /** Nome completo do usuário */
    name: string;
    
    /** Email único para identificação e login */
    email: string;
    
    /** Senha do usuário (será criptografada antes de salvar) */
    password: string;
}
