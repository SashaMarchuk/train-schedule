// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {roundsOfHashing} from "./user.constants";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        roundsOfHashing,
    );

    return this.prisma.user.create({ data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(user_id: number) {
    return this.prisma.user.findUnique({ where: { user_id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
          updateUserDto.password,
          roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  remove(user_id: number) {
    return this.prisma.user.delete({ where: { user_id } });
  }
}
