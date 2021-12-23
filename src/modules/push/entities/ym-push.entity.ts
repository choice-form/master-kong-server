import { CommonEntity } from 'src/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class YmPush extends CommonEntity {
  @Column('varchar')
  mobile: string;

  @Column('varchar')
  req: string;

  @Column('varchar')
  res: string;
}
