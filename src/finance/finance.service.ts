import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateTransactionDTO from './dto/createTransaction.dto';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(from?: string, to?: string) {
    const gte = new Date(from);
    const lte = new Date(to);

    let transactions;

    if (gte.toString() == 'Invalid Date' && !(lte.toString() == 'Invalid Date')) {
      transactions = await this.prisma.transaction.findMany({});
    } else if (
      gte.toString() == 'Invalid Date' &&
      lte.toString() == 'Invalid Date'
    ) {
      transactions = await this.prisma.transaction.findMany({
        where: {
          createdAt: {
            lte,
          },
        },
      });
    } else if (
      !(gte.toString() == 'Invalid Date') &&
      lte.toString() == 'Invalid Date'
    ) {
      transactions = await this.prisma.transaction.findMany({
        where: {
          createdAt: {
            gte,
          },
        },
      });
    } else {
      transactions = await this.prisma.transaction.findMany({
        where: {
          createdAt: {
            gte,
            lte,
          },
        },
      });
    }

    if (!transactions)
      throw new NotFoundException('transaction data not found');

    return transactions;
  }

  async getTransactionById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if(!transaction) throw new NotFoundException('Transaction data not found');
    return transaction;
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
