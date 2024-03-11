
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

  private createResponse(success: boolean, message: string, data?: any): any {
    return { success, message, data };
  }

  async findAll(): Promise<any> {
    const cats = await this.catsRepository.find();
    return this.createResponse(true, 'Cats retrieved successfully', cats);
  }

  async findOne(id: number): Promise<any> {
    const options: FindOneOptions<Cat> = { where: { id } };
    const cat = await this.catsRepository.findOne(options);

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return this.createResponse(true, 'Cat retrieved successfully', cat);
  }

  async create(cat: Cat): Promise<any> {
    const createdCat = await this.catsRepository.save(cat);
    return this.createResponse(true, 'Cat created successfully', createdCat);
  }

  async update(id: number, cat: Cat): Promise<any> {
    const existingCat = await this.findOne(id);
    Object.assign(existingCat, cat);
    const updatedCat = await this.catsRepository.save(existingCat);
    const { id: updatedId, name, age, breed } = updatedCat; // Extract only necessary fields
    return this.createResponse(true, 'Cat updated successfully', { id: updatedId, name, age, breed });
  }
///********FOR GET OLD AND NEW DATA********///
//   async update(id: number, cat: Cat): Promise<any> {
//     const existingCat = await this.findOne(id);
//     Object.assign(existingCat, cat);
//     const updatedCat = await this.catsRepository.save(existingCat);
//     return this.createResponse(true, 'Cat updated successfully', updatedCat);
//   }

  async remove(id: number): Promise<any> {
    const cat = await this.findOne(id);
    await this.catsRepository.remove(cat);
    return this.createResponse(true, 'Cat deleted successfully');
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, FindOneOptions } from 'typeorm';
// import { Cat } from './cat.entity';

// @Injectable()
// export class CatsService {
//   constructor(
//     @InjectRepository(Cat)
//     private readonly catsRepository: Repository<Cat>,
//   ) {}

//   async findAll(): Promise<Cat[]> {
//     return await this.catsRepository.find();
//   }

//   async findOne(id: number): Promise<Cat> {
//     const options: FindOneOptions<Cat> = { where: { id } };
//     const cat = await this.catsRepository.findOne(options);
//     if (!cat) {
//       throw new NotFoundException(`Cat with ID ${id} not found`);
//     }
//     return cat;
//   }

//   async create(cat: Cat): Promise<Cat> {
//     return await this.catsRepository.save(cat);
//   }

//   async update(id: number, cat: Cat): Promise<Cat> {
//     const existingCat = await this.findOne(id); // Check if cat exists
//     Object.assign(existingCat, cat); // Merge changes into existing cat
//     return await this.catsRepository.save(existingCat);
//   }

//   async remove(id: number): Promise<void> {
//     const cat = await this.findOne(id); // Check if cat exists
//     await this.catsRepository.remove(cat);
//   }
// }
