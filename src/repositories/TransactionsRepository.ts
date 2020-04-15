import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalincome = this.transactions.reduce((accumulate, currentItem) => {
      const { value } = currentItem;

      return currentItem.type === 'income' ? accumulate + value : accumulate;
    }, 0);

    const totalOutcome = this.transactions.reduce((accumulate, currentItem) => {
      const { value } = currentItem;

      return currentItem.type === 'outcome' ? accumulate + value : accumulate;
    }, 0);

    const finalTotal = totalincome - totalOutcome;

    const balance = {
      income: totalincome,
      outcome: totalOutcome,
      total: finalTotal,
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
