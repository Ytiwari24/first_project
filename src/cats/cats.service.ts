// src/cats/cats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    const options: FindOneOptions<Cat> = { where: { id } };
    const cat = await this.catsRepository.findOne(options);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  async create(cat: Cat): Promise<Cat> {
    return await this.catsRepository.save(cat);
  }

  async update(id: number, cat: Cat): Promise<Cat> {
    const existingCat = await this.findOne(id); // Check if cat exists
    Object.assign(existingCat, cat); // Merge changes into existing cat
    return await this.catsRepository.save(existingCat);
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id); // Check if cat exists
    await this.catsRepository.remove(cat);
  }
}
