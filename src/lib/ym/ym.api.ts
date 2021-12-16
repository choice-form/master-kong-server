import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { IYMRes } from 'src/interfaces/ym.interface';

@Injectable()
export class YMApi {
  server: string;
  axiosInstance: AxiosInstance;
  constructor(private readonly config: ConfigService) {
    this.server = this.config.get('YM_SERVER');
    this.axiosInstance = axios.create({
      baseURL: this.server,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 发送短消息给伊美
   * @param payload
   * @returns
   */
  async sendMessageByYm(payload: {
    mobile: string;
    content: string;
  }): Promise<IYMRes> {
    const host = this.config.get('YM_SERVER');
    const appId = this.config.get('YM_APPID');
    const secretKey = this.config.get('YM_SECRET_KEY');
    const timestamp = dayjs().format('YYYYMMDDHHmmss');
    const sign = crypto
      .createHash('md5')
      .update(appId + secretKey + timestamp)
      .digest('hex');

    const res = await axios.get(host, {
      headers: {
        appId,
      },
      params: {
        appId,
        timestamp,
        sign,
        mobiles: payload.mobile,
        content: payload.content,
      },
    });
    return res.data;
  }
}
