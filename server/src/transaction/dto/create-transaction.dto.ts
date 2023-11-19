import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsNotEmpty()
  @ApiProperty({
    title: 'Title',
    description: 'Title',
    type: String,
    example: 'My title',
    default: 'My title',
  })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    title: 'Amount',
    description: 'Amount',
    type: Number,
    example: 1000,
    default: 1000,
    minimum: 1,
  })
  amount: number;

  @IsString()
  @ApiProperty()
  type: 'expense' | 'income';

  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  category: Category;
}
