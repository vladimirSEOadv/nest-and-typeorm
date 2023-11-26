import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id: userId },
    };
    // TODO Before adding a transaction, need to check that the category exists
    if (!newTransaction) {
      throw new BadRequestException('Something went wrong...');
    }
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(userId: number) {
    const transactionList = await this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        category: true,
      },
      order: {
        createdAt: 'desc',
      },
    });
    return transactionList;
  }

  async findOne(transactionId: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
        user: { id: userId },
      },
      relations: {
        user: true,
        category: true,
      },
    });
    if (transaction) {
      return transaction;
    } else {
      throw new NotFoundException(
        `This user dont have transaction №${transactionId}`,
      );
    }
  }

  async update(
    transactionId: number,
    userId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
        user: { id: userId },
      },
    });
    if (transaction) {
      return await this.transactionRepository.update(transactionId, {
        ...updateTransactionDto,
        user: { id: +userId },
      });
    } else {
      throw new NotFoundException(
        `This user dont have transaction №${transactionId}`,
      );
    }
  }

  async remove(transactionId: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
        user: { id: userId },
      },
    });
    if (transaction) {
      return await this.transactionRepository.delete(transactionId);
    } else {
      throw new NotFoundException(
        `This user dont have transaction №${transactionId}`,
      );
    }
  }

  async findAllWithPagination(userId: number, page: number, limit: number) {
    const transactionList = await this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        category: true,
      },
      order: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    if (transactionList.length) {
      return transactionList;
    } else {
      throw new NotFoundException(
        `This user dont have transactions of page №${page}`,
      );
    }
  }

  async findAllByType(userId: number, transactionType: 'expense' | 'income') {
    const transactionList = await this.transactionRepository.find({
      where: {
        user: { id: userId },
        type: transactionType,
      },
      relations: {
        user: true,
        category: true,
      },
      order: {
        createdAt: 'desc',
      },
    });
    if (!transactionList.length) {
      throw new NotFoundException(
        `This user dont have ${transactionType} transactions`,
      );
    }
    return transactionList.reduce((acc, currentTransaction) => {
      return (acc += currentTransaction.amount);
    }, 0);
  }
}
