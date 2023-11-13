import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const category = await this.categoryRepository.findBy({
      user: { id: userId },
      title: createCategoryDto.title,
    });
    if (category.length) {
      throw new BadRequestException('Category already exist');
    }

    const newCategory = {
      title: createCategoryDto.title,
      user: { id: userId },
    };

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(userId: number) {
    const category = await this.categoryRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        transactions: true,
      },
    });
    if (!category.length) {
      throw new BadRequestException('This user dont have any category');
    } else {
      return category;
    }
  }

  async findOne(categoryId: number, userId) {
    const category = await this.categoryRepository.find({
      where: {
        user: { id: userId },
        id: categoryId,
      },
      relations: {
        user: true,
        transactions: true,
      },
    });
    if (!category.length) {
      throw new BadRequestException('This user dont have any category');
    } else {
      return category;
    }
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${categoryId} category`;
  }

  async remove(categoryId: number) {
    return `This action removes a #${categoryId} category`;
  }
}
