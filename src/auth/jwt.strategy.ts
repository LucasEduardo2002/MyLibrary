import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * Estratégia JWT para Autenticação
 * 
 * Implementa a validação de tokens JWT usando Passport:
 * - Extrai o token do header Authorization como Bearer token
 * - Valida o token usando a secret key do ambiente
 * - Decodifica e retorna os dados do usuário autenticado
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Extrai token do header "Authorization: Bearer <token>"
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Não aceita tokens expirados
            ignoreExpiration: false,
            // Chave secreta para validação (deve estar no .env)
            secretOrKey: process.env.JWT_SECRET!,
        });
    }

    /**
     * Valida e decodifica o payload do token JWT
     * 
     * @param payload - Payload decodificado do token (contém email e sub)
     * @returns Objeto com dados do usuário (userId e email)
     */
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}