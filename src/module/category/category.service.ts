import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private category: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.category.create(createCategoryDto);
    await this.category.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.category.find();
  }

  async findOne(id: string) {
    const category = await this.category.findOneBy({ id });

    if (!category)
      throw new NotFoundException({
        success: false,
        message: 'Category not found',
        status_code: HttpStatus.NOT_FOUND,
      });

    return category;
  }
}
