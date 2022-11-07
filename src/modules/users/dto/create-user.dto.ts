import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsString,
} from 'class-validator';

import { IsEmailAlreadyExist } from '../../../shared/decorators/isEmailAlreadyExist';

export class CreateUserDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsEmailAlreadyExist({
    message: 'There is already a user with that email address.',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(14, {
    message: 'phoneNumber must have a maximum of 15 characters.',
  })
  @MinLength(10, { message: 'phoneNumber needs at least 10 characters.' })
  readonly mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(18, {
    message: 'cpfCnpj must have a maximum of 18 characters.',
  })
  @MinLength(11, { message: 'cpfCnpj needs at least 11 characters.' })
  readonly cpfCnpj: string;
}
