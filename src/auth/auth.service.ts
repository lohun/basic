import { AuthDto } from '../dtos/auth.dto';
import { Model, MongooseError } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { isEmpty } from 'class-validator';
import { UpdateDTO } from 'src/dtos/upat.dt';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    private jwtservice: JwtService,
  ) {}

  async register(user: AuthDto) {
    const check = await this.locate(user.email);
    if (!isEmpty(check)) {
      return check;
    }
    const salt = await genSalt(10);
    const password = await hash(user.password, salt);
    user.password = password;
    const createdUser = new this.users(user);
    return createdUser.save();
  }

  locate(email: string) {
    try {
      return this.users.findOne({ email: email });
    } catch (err) {
      console.log(err);
      throw MongooseError;
    }
  }

  async login(param: UpdateDTO) {
    const user = await this.locate(param.email);
    const check = await compare(param.password, user?.password);
    if (!check) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtservice.signAsync(payload),
    };
  }
}
