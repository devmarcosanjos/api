import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request: { userId: string }) {
    console.log({ me: request.userId });
    return this.usersService.getUserById('userId');
  }
}
