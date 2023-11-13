import { IsNotEmpty, IsOptional } from 'class-validator';
import { IUser } from '../../types/types';

export class CreateCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  user?: IUser;
}
