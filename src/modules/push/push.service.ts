import { Injectable } from '@nestjs/common';
import { YMApi } from 'src/lib/ym/ym.api';
import { MobileTemplateService } from '../template/mobile-template/mobile-template.service';

@Injectable()
export class PushService {
  constructor(
    private readonly ymApi: YMApi,
    private readonly mobileTemplate: MobileTemplateService,
  ) {}
  async push(payload: { mobile: string }) {
    const template = await this.mobileTemplate.findOne();
    return this.ymApi.sendMessageByYm({
      mobile: payload.mobile,
      content: template.content,
    });
  }
}
