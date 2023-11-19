import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const userId = req.user.id;
    return this.transactionService.create(createTransactionDto, +userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.transactionService.findAll(+userId);
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAllByType(
    @Request() req,
    @Param('type') transactionType: 'expense' | 'income',
  ) {
    const userId = req.user.id;
    return this.transactionService.findAllByType(+userId, transactionType);
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAllWithPagination(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    const userId = req.user.id;
    return this.transactionService.findAllWithPagination(
      +userId,
      +page,
      +limit,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') idTransaction: string, @Request() req) {
    const userId = req.user.id;
    return this.transactionService.findOne(+idTransaction, +userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') idTransaction: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.transactionService.update(
      +idTransaction,
      +userId,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') idTransaction: string, @Request() req) {
    const userId = req.user.id;
    return this.transactionService.remove(+idTransaction, +userId);
  }
}
