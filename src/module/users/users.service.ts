import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private users: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.users.create(createUserDto);

    return await this.users.save(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.users.findOneBy({ email });

    if (!user)
      throw new HttpException(
        {
          success: false,
          message: 'Invalid credentials',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new HttpException(
        {
          success: false,
          message: 'Invalid credentials',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async findUserByID(id: string) {
    return await this.users.findOneBy({ id });
  }
}
