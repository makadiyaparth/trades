import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getToday } from '../shared/util/date-util';
import { StockDTO } from './dto/stock-dto';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  refreshList$ = new BehaviorSubject<boolean>(true);
  stockDTO: StockDTO = { id: 0, transactionDate: getToday() } as StockDTO;

  edit(stockDTO: StockDTO): void {
    this.stockDTO = stockDTO;
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }
}
