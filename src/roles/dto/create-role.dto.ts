import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../entities/roles.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isDeleted: boolean;

  @IsNotEmpty()
  user: Role;
}
