import { InstrumentDTO } from "../../instrument/dto/instrument-dto";
import { TransactionType } from "../../shared/enum/transaction-type.enum";
import { OptionsType } from "../enum/option-type.enum";

export interface OptionsDTO {
  id: number;
  instrumentDTO: InstrumentDTO;
  strikePrice: number;
  optionsType: OptionsType;
  transactionType: TransactionType;
  expiryDate: string;
  price: number;
  lots: number;
  note?: string;
}
