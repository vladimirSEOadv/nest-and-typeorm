import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const userId = Number(req.user.id);
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Request() req) {
    const userId = Number(req.user.id);
    return this.categoryService.findAll(userId);
  }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe())
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }
  //
  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
