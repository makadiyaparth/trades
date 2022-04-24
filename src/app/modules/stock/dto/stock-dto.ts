import { InstrumentDTO } from "../../instrument/dto/instrument-dto";
import { TransactionType } from "../../shared/enum/transaction-type.enum";

export interface StockDTO {
  id: number;
  instrumentDTO: InstrumentDTO;
  price: number;
  quantity: number;
  note: string;
  transactionDate: string;
  transactionType: TransactionType;
}
