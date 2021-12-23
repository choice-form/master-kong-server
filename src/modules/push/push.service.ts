import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YMApi } from 'src/lib/ym/ym.api';
import { Repository } from 'typeorm';
import { MobileTemplateService } from '../template/mobile-template/mobile-template.service';
import { YmPush } from './entities/ym-push.entity';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(YmPush)
    private readonly ymPushRepository: Repository<YmPush>,
    private readonly ymApi: YMApi,
    private readonly mobileTemplate: MobileTemplateService,
  ) {}
  async push(payload: { mobile: string; template_name: string }) {
    const template = await this.mobileTemplate.findByName(
      payload.template_name,
    );
    const res = await this.ymApi.sendMessageByYm({
      mobile: payload.mobile,
      content: template.content,
    });
    await this.ymPushRepository.save({
      mobile: payload.mobile,
      req: template.content,
      res: JSON.stringify(res),
    });
  }
}
