import { CommonEntity } from 'src/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SysUser extends CommonEntity {
  @Column('varchar', { nullable: true })
  nickname: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { select: false })
  password: string;

  @Column('varchar', { nullable: true, select: false })
  old_password: string;

  @Column('int')
  role: number;
}
