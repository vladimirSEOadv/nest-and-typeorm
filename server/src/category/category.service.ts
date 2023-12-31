import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return category;
  }

  async findOne(categoryId: number, userId: number) {
    const category = await this.categoryRepository.find({
      where: {
        user: { id: userId },
        id: categoryId,
      },
      relations: {
        transactions: true,
      },
    });
    if (category.length) {
      return category;
    } else {
      throw new NotFoundException(
        `This user dont have category №${categoryId}`,
      );
    }
  }

  async update(
    categoryId: number,
    userId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        user: { id: userId },
      },
    });
    if (category) {
      return await this.categoryRepository.update(categoryId, {
        ...updateCategoryDto,
        user: { id: +userId },
      });
    } else {
      throw new NotFoundException(
        `Category ${categoryId} for this user not found`,
      );
    }
  }

  async remove(categoryId: number, userId: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        user: { id: userId },
      },
    });
    if (category) {
      return await this.categoryRepository.delete(categoryId);
    } else {
      throw new NotFoundException(
        `Category ${categoryId} for this user not found`,
      );
    }
  }
}
