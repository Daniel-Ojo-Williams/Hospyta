import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userSerivce: UsersService) {}

  @Post('register')
  async createUser(@Body() createuserDto: CreateUserDto) {
    await this.userSerivce.register(createuserDto);

    return {
      success: true,
      message: 'User registered successfully',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    const token = await this.userSerivce.signIn(user.email, user.password);

    return {
      success: true,
      message: 'User logged in successfully',
      access_token: token,
    };
  }
}
