import { TransactionType } from "../../shared/enum/transaction-type.enum";
import { OptionsType } from "../enum/option-type.enum";

export interface OptionsDTO {
  id: number;
  instrumentName: string;
  strikePrice: number;
  optionType: OptionsType;
  transactionType: TransactionType;
  expiryDate: string;
  price: number;
  lots: number;
  note?: string;
}
