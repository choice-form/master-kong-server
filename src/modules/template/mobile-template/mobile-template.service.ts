import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMobileTemplateDto } from './dto/create-mobile-template.dto';
import { UpdateMobileTemplateDto } from './dto/update-mobile-template.dto';
import { MobileTemplate } from './entities/mobile-template.entity';

@Injectable()
export class MobileTemplateService {
  constructor(
    @InjectRepository(MobileTemplate)
    private readonly mobileTemplateRepository: Repository<MobileTemplate>,
  ) {}
  async create(createMobileTemplateDto: CreateMobileTemplateDto) {
    const count = await this.mobileTemplateRepository.count();
    if (count >= 3) {
      throw new HttpException(
        '3 template records are full',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.mobileTemplateRepository.save(createMobileTemplateDto);
  }

  findAll() {
    return this.mobileTemplateRepository.findAndCount();
  }

  findOne(id?: number) {
    return this.mobileTemplateRepository.findOneBy({
      id: id,
    });
  }

  findByName(name: string) {
    return this.mobileTemplateRepository.findOne({
      where: {
        name,
      },
    });
  }

  update(id: number, updateMobileTemplateDto: UpdateMobileTemplateDto) {
    return this.mobileTemplateRepository.update(
      { id },
      updateMobileTemplateDto,
    );
  }

  remove(id: number) {
    return this.mobileTemplateRepository.delete(id);
  }
}
