import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { name: data?.name },
    });
    if (role) {
      throw new NotFoundException(`Role already exists`);
    }
    const newRole = this.rolesRepository.create(data);
    return await this.rolesRepository.save(newRole);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id, isDeleted: false },
      select: ['id', 'name', 'isDeleted', 'createdAt', 'updatedAt'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    this.rolesRepository.merge(role, data);
    return await this.rolesRepository.save(role);
  }

  async delete(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    role.isDeleted = true;
    return await this.rolesRepository.save(role);
  }
}
