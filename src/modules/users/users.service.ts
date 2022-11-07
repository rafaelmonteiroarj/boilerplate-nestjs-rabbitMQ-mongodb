import { UpdateCustomerDto } from './dto/update-user.dto';
import { SearchUserDTO } from './dto/search.user.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { from, Observable } from 'rxjs';

import { User } from './user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly repository: Model<User>,
  ) {}

  public async findAll(
    search?: SearchUserDTO,
    skip = 0,
    limit = 10,
  ): Promise<Observable<User[]>> {
    try {
      if (search) {
        return from(
          this.repository
            .find({
              firstName: {
                $regex: new RegExp(search.firstName),
                $options: 'i',
              },
              lastName: { $regex: new RegExp(search.lastName), $options: 'i' },
              email: { $regex: new RegExp(search.email), $options: 'i' },
              mobileNumber: {
                $regex: new RegExp(search.mobileNumber),
                $options: 'i',
              },
              cpfCnpj: { $regex: new RegExp(search.cpfCnpj), $options: 'i' },
            })
            .skip(skip)
            .limit(limit)
            .exec(),
        );
      } else {
        return from(this.repository.find({}).skip(skip).limit(limit).exec());
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(req: CreateUserDTO): Promise<User> {
    try {
      return await this.repository.create(req);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, req: UpdateCustomerDto): Promise<User> {
    try {
      const user = await this.findById(id);

      if (user.email !== req.email) {
        const user = await this.repository.findOne({ email: req.email }).exec();
        if (user) {
          throw new BadRequestException(
            'There is already a user with that email address.',
          );
        }
      }

      if (user.cpfCnpj !== req.cpfCnpj) {
        const user = await this.repository
          .findOne({ cpfCnpj: req.cpfCnpj })
          .exec();
        if (user) {
          throw new BadRequestException(
            'There is already a user with that cpf or cnpj.',
          );
        }
      }

      await this.repository.findByIdAndUpdate({ _id: id }, req);

      return await this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string): Promise<User> {
    let user;

    try {
      user = await this.repository.findById(id);

      if (!user) {
        throw new NotFoundException('No user found, related to id: ${id}');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return user;
  }

  public async remove(id: string): Promise<Observable<User>> {
    try {
      await this.findById(id);
      return await this.repository.findByIdAndRemove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
