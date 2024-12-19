import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(email: string, password: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({ email, password: passwordHash });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    return user;
  }
}
