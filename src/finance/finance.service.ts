import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateTransactionDTO from './dto/createTransaction.dto';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(from?: string, to?: string) {
    const gte = new Date(from);
    const lte = new Date(to);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        createdAt: {
          gte,
          lte,
        },
      },
    });

    if (!transactions)
      throw new NotFoundException('transaction data not found');

    return transactions;
  }

  async getTransactionById(id: number) {
    return this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async createTransaction(transaction: CreateTransactionDTO) {
    return this.prisma.transaction.create({
      data: {
        ...transaction,
      },
    });
  }

  async deleteTransactionById(id: number) {
    return this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
