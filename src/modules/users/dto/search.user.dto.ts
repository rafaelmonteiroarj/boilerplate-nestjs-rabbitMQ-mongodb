import {
  MaxLength,
  MinLength,
  IsOptional,
  IsEmail,
  IsString,
} from 'class-validator';

export class SearchUserDTO {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly lastName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(14, {
    message: 'phoneNumber must have a maximum of 15 characters.',
  })
  @MinLength(10, { message: 'phoneNumber needs at least 10 characters.' })
  readonly mobileNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(18, {
    message: 'cpfCnpj must have a maximum of 18 characters.',
  })
  @MinLength(11, { message: 'cpfCnpj needs at least 11 characters.' })
  readonly cpfCnpj?: string;
}
