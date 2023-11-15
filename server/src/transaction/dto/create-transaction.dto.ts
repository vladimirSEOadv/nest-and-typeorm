import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  type: 'expense' | 'income';

  @IsNotEmpty()
  category: Category;
}
