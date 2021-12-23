import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileTemplateDto } from './create-mobile-template.dto';

export class UpdateMobileTemplateDto extends PartialType(
  CreateMobileTemplateDto,
) {}
