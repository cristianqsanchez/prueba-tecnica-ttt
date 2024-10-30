import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prismaService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('username')) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findOne(username: string) {
    return await this.prismaService.user.findFirst({
      where: { username },
    });
  }
}
