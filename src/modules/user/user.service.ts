import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mergePaging } from 'src/utils';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async batch(userList: CreateUserDto[]) {
    const list = [];
    for (let i = 0; i < userList.length; i++) {
      const user = await this.create(userList[i]);
      list.push(user);
    }
    return list;
  }

  findAll(findAllUserDto: FindAllUserDto) {
    let findOpts: FindManyOptions<User> = null;
    findOpts = mergePaging(findOpts, findAllUserDto);
    findOpts.relations = ['pushLogList'];

    return this.userRepository.findAndCount(findOpts);
  }

  findOne(id: number) {
    return this.userRepository.findOne(id, {
      relations: ['pushLogList'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const user = await this.userRepository.findOne(id);
    return await this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
