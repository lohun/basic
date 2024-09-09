import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UpdateDTO } from '../dtos/upat.dt';
import { User } from '../schema/user.schema';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private users: Model<User>) {}

  findAll() {
    try {
      return this.users.find();
    } catch {
      throw new NotFoundException();
    }
  }

  findOne(id: string) {
    try {
      return this.users.findById(new mongoose.Types.ObjectId(id));
    } catch {
      throw new NotFoundException();
    }
  }

  async updateOne(id: string, param: UpdateDTO) {
    try {
      const salt = await genSalt(10);
      const password = await hash(param.password, salt);
      param.password = password;
      return this.users.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        param,
      );
    } catch {
      throw new NotFoundException();
    }
  }

  deleteOne(id: string) {
    try {
      return this.users.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    } catch {
      throw new NotFoundException();
    }
  }
}
