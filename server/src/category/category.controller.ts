import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const userId = req.user.id;
    return this.categoryService.create(createCategoryDto, +userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.categoryService.findAll(+userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.categoryService.findOne(+id, +userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.categoryService.update(+id, userId, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.categoryService.remove(+id, +userId);
  }
}
