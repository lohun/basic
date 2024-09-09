import { AuthDto } from './auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDTO extends PartialType(AuthDto) {}
