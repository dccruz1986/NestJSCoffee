import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Expresso',
      brand: 'La Llave',
      flavor: ['chocolate', 'vainilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`the coffee with te id ${id} dosn't exist`);
    }
    return coffee;
  }

  create(body: any) {
    this.coffees.push(body);
    return body;
  }

  update(id: string, body: any) {
    const existingCoffee = this.findOne(id);
    if (!existingCoffee) {
      throw new NotFoundException(`The coffee dosn't found`);
    }
    this.coffees = this.coffees.map((item) =>
      item.id === +id ? { ...item, ...body } : item,
    );
    return { ...existingCoffee, ...body };
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
