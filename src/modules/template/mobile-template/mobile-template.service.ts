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
    const res = await this.findOne();
    if (res) {
      throw new HttpException('the template has one', HttpStatus.FORBIDDEN);
    }
    return this.mobileTemplateRepository.save(createMobileTemplateDto);
  }

  findAll() {
    return this.mobileTemplateRepository.findAndCount();
  }

  findOne(id?: number) {
    return this.mobileTemplateRepository.findOne(id);
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
