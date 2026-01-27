import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))

  @Post()
  async create(@Request() req, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto, req.user.userId);
  }

  @Get('me')
  findAll(@Request() req) {
    return this.booksService.findAllByUser(req.user.userId);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.booksService.remove(+id, req.user.userId);
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, req.user.userId, updateBookDto);
  }
}
