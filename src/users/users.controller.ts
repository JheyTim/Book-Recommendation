import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.createUser(body.email, body.password);
    return { message: 'User created successfully', userId: user._id };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    // `req.user` is populated by JwtStrategy
    return { userId: req.user.userId, email: req.user.email };
  }
}
