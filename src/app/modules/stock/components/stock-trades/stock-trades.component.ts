import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { StockDTO } from '../../dto/stock-dto';
import { StockService } from '../../service/stock.service';

@Component({
  selector: 'app-stock-trades',
  templateUrl: './stock-trades.component.html',
  styleUrls: ['./stock-trades.component.scss']
})
export class StockTradesComponent implements OnInit {
  @Input() refreshList$ = new BehaviorSubject<boolean>(true);
  @Output() onEdit = new EventEmitter<StockDTO>();

  stockDTOs$: Observable<StockDTO[]> = new Observable();

  constructor(private _service: StockService) { }

  ngOnInit(): void {
    this.stockDTOs$ = this.refreshList$.pipe(switchMap(_ => this._service.findAll()));
  }

  edit(stockDTO: StockDTO): void {
    this.onEdit.emit(stockDTO);
  }

  delete(id: number): void {
    this._service.delete(id).subscribe(_ => this.refreshList());
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }
}
