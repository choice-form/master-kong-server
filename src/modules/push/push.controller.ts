import { Body, Controller, Post, Req } from '@nestjs/common';
import { PushService } from './push.service';

class SendMessageDto {
  mobile: string;
  content: string;
}

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('')
  async push(@Body() body: { mobile: string }) {
    const { mobile } = body;
    const content = `【凯迪拉克】LYRIQ预订用户专享！参与LYRIQ用户调研获500 IQ积分。点击链接，立刻参与：https://q.cform.io/?cWXbF7Ns 回T退订`;
    return this.pushService.pushTemp({
      mobile,
      content,
    });
  }
  @Post('/mobile')
  async pushMobileMessage(@Body() body: SendMessageDto) {
    const { mobile, content } = body;
    return this.pushService.pushTemp({
      mobile,
      content,
    });
  }
}
