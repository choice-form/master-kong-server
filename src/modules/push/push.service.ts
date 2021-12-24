import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YMApi } from 'src/lib/ym/ym.api';
import { Repository } from 'typeorm';
import { MobileTemplateService } from '../template/mobile-template/mobile-template.service';
import { User } from '../user/entities/user.entity';
import { YmPush } from './entities/ym-push.entity';

@Injectable()
export class PushService {
  constructor(
    @InjectRepository(YmPush)
    private readonly ymPushRepository: Repository<YmPush>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly ymApi: YMApi,
    private readonly mobileTemplate: MobileTemplateService,
  ) {}
  async push(payload: { mobile: string; template_name: string }) {
    const template = await this.mobileTemplate.findByName(
      payload.template_name,
    );
    const user = await this.userRepository.findOne({
      where: {
        mobile: payload.mobile,
      },
    });
    user.pushCount = user.pushCount + 1;
    await this.userRepository.save(user);
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
