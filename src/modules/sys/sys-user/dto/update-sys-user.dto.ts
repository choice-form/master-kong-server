import { PartialType } from '@nestjs/mapped-types';
import { CreateSysUserDto } from './create-sys-user.dto';

export class UpdateSysUserDto extends PartialType(CreateSysUserDto) {}
