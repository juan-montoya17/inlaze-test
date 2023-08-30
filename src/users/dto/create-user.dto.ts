import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Role } from '../../roles/entities/roles.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsEmail({})
  @IsNotEmpty()
  readonly email: string;

  @Length(8, 32)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Role;

  @IsBoolean()
  @IsNotEmpty()
  readonly isDeleted: boolean;
}
