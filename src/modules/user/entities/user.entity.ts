import { CommonEntity } from 'src/entity';
import { PushLog } from 'src/modules/push-log/entities/push-log.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  mobile: string;

  @OneToMany(() => PushLog, (pushLog) => pushLog.user)
  pushLogList: PushLog[];
}
