// users.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from '../data/schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAll() {
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }
  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async findByUsernameAndPassword(username: string, password: string) {
    return this.userModel.findOne({ username, password }).exec();
  }
}
