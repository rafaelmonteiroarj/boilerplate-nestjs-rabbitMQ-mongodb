import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateCustomerDto extends CreateUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
