import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly cars: Car[] = [];
  private carId = 1;

  create(createCarDto: CreateCarDto) {
    const newCar = {
      id: this.carId,
      brand: createCarDto.brand,
      model: createCarDto.model,
      year: createCarDto.year,
    };

    this.carId = this.carId + 1;

    this.cars.push(newCar);

    return newCar;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException('Carro não encontrado');
    }

    return car;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const car = this.findOne(id);
    car.brand = updateCarDto.brand;
    car.model = updateCarDto.model;
    car.year = updateCarDto.year;

    return;
  }

  remove(id: number) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars.splice(carIndex, 1);
    return `This action removes a #${id} car`;
  }
}