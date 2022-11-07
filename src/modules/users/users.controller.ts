import { UpdateCustomerDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.schema';
import { SearchUserDTO } from './dto/search.user.dto';
import { ValidationObjectIdPipe } from 'src/shared/pipes/objectIdIsValid.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async list(
    @Body() req?: SearchUserDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Observable<User[]>> {
    return this.userService.findAll(req, skip, limit);
  }

  @Get('/:id')
  async findById(
    @Res() res,
    @Param('id', ValidationObjectIdPipe) id?: string,
  ): Promise<Observable<User>> {
    const user = await this.userService.findById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete('/:id')
  async remove(
    @Res() res,
    @Param('id', ValidationObjectIdPipe) id?: string,
  ): Promise<Observable<User>> {
    const user = await this.userService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'User has been removed successfully.',
      user,
    });
  }

  @Post()
  public async create(@Res() res, @Body() req: CreateUserDTO) {
    try {
      const user = await this.userService.create(req);
      return res.status(HttpStatus.OK).json({
        message: 'User has been created successfully.',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not created!',
        status: 400,
      });
    }
  }

  @Patch('/:id')
  public async update(
    @Res() res,
    @Param('id', ValidationObjectIdPipe) id: string,
    @Body() req: UpdateCustomerDto,
  ) {
    const user = await this.userService.update(id, req);
    return res.status(HttpStatus.OK).json({
      message: 'User has been updated successfully.',
      user,
    });
  }
}
