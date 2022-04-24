import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { InstrumentDTO } from 'src/app/modules/instrument/dto/instrument-dto';
import { InstrumentService } from 'src/app/modules/instrument/service/instrument.service';
import { TransactionType } from 'src/app/modules/shared/enum/transaction-type.enum';
import { getToday } from 'src/app/modules/shared/util/date-util';
import { StockDTO } from '../../dto/stock-dto';
import { StockInDTO } from '../../dto/stock-in-dto';
import { StockUpdateDTO } from '../../dto/stock-update-dto';
import { StockService } from '../../service/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnChanges {
  @Input() stockDTO: StockDTO = { id: 0 } as StockDTO;
  @Output() onChange: EventEmitter<void> = new EventEmitter();

  editMode = false;
  today = getToday();
  TransactionType = TransactionType;
  instrumentDTOs: InstrumentDTO[] = [];

  formGroup: FormGroup = this._fb.group({
    instrumentName: [this.stockDTO.instrumentDTO?.name, Validators.required],
    price: [this.stockDTO.price, Validators.required],
    quantity: [this.stockDTO.quantity, Validators.required],
    transactionDate: [this.stockDTO.transactionDate ?? this.today, Validators.required],
    note: [this.stockDTO.note],
  });

  constructor(private _fb: FormBuilder, private _router: Router, private _service: StockService, private _instrumentService: InstrumentService) { }

  ngOnInit(): void {
    this.fetchInstruments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stockDTO = changes['stockDTO'].currentValue;
    this.patchForm(stockDTO);
    this.editMode = stockDTO.id !== 0;
  }

  save(transactionType: TransactionType): void {
    this._service.save(this.compileInDTO(transactionType)).pipe(first()).subscribe(_ => this.onSuccess());
  }

  update(): void {
    this._service.update(this.compileUpdateDTO()).pipe(first()).subscribe(_ => this.onSuccess());
  }

  reset(): void {
    this.formGroup.reset();
    this.formGroup.patchValue({
      transactionDate: getToday()
    })
    this.editMode = false;
  }

  private onSuccess(): void {
    this.onChange.emit();
    this.reset();
    this.editMode = false;
  }

  private compileUpdateDTO(): StockUpdateDTO {
    return {
      id: this.stockDTO.id,
      instrumentName: this.formGroup.get('instrumentName')?.value,
      price: this.formGroup.get('price')?.value,
      quantity: this.formGroup.get('quantity')?.value,
      transactionType: this.stockDTO.transactionType,
      transactionDate: this.formGroup.get('transactionDate')?.value,
      note: this.formGroup.get('note')?.value
    }
  }

  private compileInDTO(transactionType: TransactionType): StockInDTO {
    return {
      instrumentName: this.formGroup.get('instrumentName')?.value,
      price: this.formGroup.get('price')?.value,
      quantity: this.formGroup.get('quantity')?.value,
      transactionType: transactionType,
      transactionDate: this.formGroup.get('transactionDate')?.value,
      note: this.formGroup.get('note')?.value
    }
  }

  private patchForm(stockDTO: StockDTO): void {
    this.formGroup.reset();
    this.formGroup.patchValue({
      ...stockDTO,
      instrumentName: stockDTO?.instrumentDTO?.name
    });
  }

  private fetchInstruments(): void {
    this._instrumentService.findAll().subscribe(dtos => this.instrumentDTOs = dtos);
  }

}
