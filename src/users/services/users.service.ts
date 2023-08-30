import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   * @param {CreateUserDto} data - The user data
   * @returns {Promise<User>} - The created user
   */
  async create(data: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: data?.email },
    });
    if (user) {
      throw new BadRequestException(`User already exists`);
    }
    const newUser = this.usersRepository.create(data);
    newUser.password = bcrypt.hashSync(newUser?.password, 12);
    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.password;
    return createdUser;
  }

  /**
   * Find a user by id
   * @param {string} id - The user id
   * @returns {Promise<User>} - The user of the given id
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id, isDeleted: false },
      select: [
        'id',
        'fullName',
        'email',
        'phone',
        'isDeleted',
        'createdAt',
        'updatedAt',
      ],
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Find a user by email
   * @param {string} email - The email
   * @returns {Promise<User>} - The user of the given email
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Update a user
   * @param {string} id - The user id
   * @param {UpdateUserDto} data - The user data to update
   * @returns {Promise<User>} - The updated user
   */
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersRepository.merge(user, data);
    if (data?.password) {
      user.password = bcrypt.hashSync(data?.password, 12);
    }
    const updatedUser = await this.usersRepository.save(user);
    delete updatedUser?.password;
    return updatedUser;
  }

  /**
   * Delete a user
   * @param {string} id - The user id
   * @returns {Promise<User>} - The deleted user
   */
  async delete(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersRepository.merge(user, { isDeleted: true });
    const deletedUser = await this.usersRepository.save(user);
    delete deletedUser?.password;
    return deletedUser;
  }
}
