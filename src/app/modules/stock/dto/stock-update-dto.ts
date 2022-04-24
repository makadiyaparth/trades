import { TransactionType } from "../../shared/enum/transaction-type.enum";

export interface StockUpdateDTO {
  id: number;
  instrumentName: string;
  price: number;
  quantity: number;
  note: string;
  transactionDate: string;
  transactionType: TransactionType;
}
