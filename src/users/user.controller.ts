import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './user.service';
import { UpdateDTO } from '../dtos/upat.dt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  findall() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findone(@Param() id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateone(@Param() id: string, @Body() param: UpdateDTO) {
    return this.userService.updateOne(id, param);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteone(@Param() id: any) {
    return this.userService.deleteOne(id);
  }
}
