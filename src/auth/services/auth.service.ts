import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param {CreateUserDto} data - The user data
   * @returns {Promise<{ user: User, token: string }>} - The user and the token
   */
  async register(data: CreateUserDto): Promise<{ user: User; token: string }> {
    const user = await this.usersService.create(data);
    const token = this.jwtService.sign({
      id: user?.id,
      fullName: user?.fullName,
      email: user?.email,
      role: user?.role,
      isDeleted: user?.isDeleted,
    });
    return { user, token };
  }

  /**
   * Login a user
   * @param {string} credentials - The email and the password
   * @returns {Promise<{ user: User, token: string }>} - The user and the token
   */
  async login(credentials: LoginDto): Promise<{ user: User; token: string }> {
    const user = await this.usersService.findByEmail(credentials?.email);
    const isMatch: boolean = bcrypt.compareSync(
      credentials?.password,
      user?.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException(`Login data does not match`);
    }
    const token = this.jwtService.sign({
      id: user?.id,
      fullName: user?.fullName,
      email: user?.email,
      role: user?.role,
      isDeleted: user?.isDeleted,
    });
    return { user, token };
  }
}
