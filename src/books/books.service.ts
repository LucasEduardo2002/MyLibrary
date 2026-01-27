import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, userId: number) {
    return this.prisma.book.create({
      data: {
        name: createBookDto.name,
        bookGenres: createBookDto.bookGenres,
        author: createBookDto.author,
        pages: createBookDto.pages,
        userId: userId,
      },
    })
  
  }

  findAllByUser(userId: number) {
    return this.prisma.book.findMany({
      where: { userId: userId },
    });
  }


  async remove(id: number, userId: number) {
    const book = await this.prisma.book.findUnique({
      where: { id: id },
    });
    if (!book) {
      throw new Error("Book not found.");
    }
    if (userId !== book.userId) {
      throw new Error("You do not have permission to delete this book.");
    }
    return this.prisma.book.delete({
      where: { id: id },
    });
  }


  async update(id: number, userId: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: id },    
    });
    if (!book) {
      throw new Error("Book not found.");
    }
    if (userId !== book.userId) {
      throw new Error("You do not have permission to update this book.");
    }
    return this.prisma.book.update({
      where: { id: id },
      data: {
        ...updateBookDto,
      },
    });
  }
}
