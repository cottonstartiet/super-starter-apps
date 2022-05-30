import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>, // eslint-disable-next-line prettier/prettier
  ) { }

  create(createCustomerDto: CreateCustomerDto) {
    const created = new this.customerModel(createCustomerDto);
    return created.save();
  }

  findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
