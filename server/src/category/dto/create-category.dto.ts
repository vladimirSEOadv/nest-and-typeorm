import { IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from '../../types/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  user?: IUser;
}
