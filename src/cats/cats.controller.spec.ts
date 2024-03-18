import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return this.catsService.create(cat);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() cat: Cat): Promise<Cat> {
    return this.catsService.update(Number(id), cat);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(Number(id));
  }
}

// import { Test, TestingModule } from '@nestjs/testing';
// import { CatsController } from './cats.controller';

// describe('CatsController', () => {
//   let controller: CatsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CatsController],
//     }).compile();

//     controller = module.get<CatsController>(CatsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

// });

// src/cats/cats.controller.ts
