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

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const categoryExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });
    if (categoryExist.length) {
      throw new BadRequestException('Category already exist');
    }

    const newCategory = {
      title: createCategoryDto.title,
      user: { id },
    };

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(id: number) {
    const result = await this.categoryRepository.find({
      where: {
        user: { id },
      },
      relations: {
        transactions: true,
      },
    });
    if (!result.length) {
      throw new BadRequestException('This user dont have any category');
    } else {
      return result;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
