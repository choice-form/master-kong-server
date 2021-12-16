import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateSysUserDto } from './dto/create-sys-user.dto';
import { UpdateSysUserDto } from './dto/update-sys-user.dto';
import { SysUser } from './entities/sys-user.entity';

@Injectable()
export class SysUserService {
  constructor(
    @InjectRepository(SysUser)
    private readonly sysUserRepository: Repository<SysUser>,
  ) {}
  async create(createSysUserDto: CreateSysUserDto) {
    const user = await this.sysUserRepository.findOne({
      where: {
        email: createSysUserDto.email,
      },
    });
    if (user) {
      throw new HttpException('user is exist', HttpStatus.FORBIDDEN);
    }
    return this.sysUserRepository.save(createSysUserDto);
  }

  findAll() {
    return this.sysUserRepository.findAndCount();
  }

  findOne(id: string) {
    return this.sysUserRepository.findOne(id);
  }

  findByName(email: string, hasPassword = false) {
    const findOptions: FindOneOptions<SysUser> = {
      where: {
        email,
      },
    };
    if (hasPassword) {
      findOptions.select = ['id', 'nickname', 'password', 'email'];
    }
    return this.sysUserRepository.findOne(findOptions);
  }

  async update(id: string, updateSysUserDto: UpdateSysUserDto) {
    const user = await this.sysUserRepository.findOne(id);
    if (!user) {
      throw new HttpException('user is not found', HttpStatus.FORBIDDEN);
    }
    const { updated_at, created_at, ...rest } = user;
    const newUser = Object.assign(rest, updateSysUserDto);
    return this.sysUserRepository.save(newUser);
  }

  remove(id: string) {
    return this.sysUserRepository.delete(id);
  }
}
