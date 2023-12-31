import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesServices: CoffeesService) {}

  @Get()
  findAll(@Query() queryPagination) {
    // const { limit, offset } = queryPagination;
    return this.coffeesServices.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesServices.findOne(id);
  }
  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesServices.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesServices.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesServices.remove(id);
  }
}
