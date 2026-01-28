/**
 * DTO para adição de novo livro
 * 
 * Define os dados necessários para adicionar um livro à biblioteca:
 * - name: Título do livro (obrigatório)
 * - bookGenres: Gêneros do livro (opcional)
 * - author: Autor do livro (opcional)
 * - pages: Número de páginas (opcional)
 */
export class CreateBookDto {
    /** Título do livro */
    name: string;
    
    /** Gêneros do livro (ex: "Ficção, Aventura") */
    bookGenres?: string;
    
    /** Nome do autor */
    author?: string;
    
    /** Número de páginas do livro */
    pages?: number;
}
