import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { InstrumentDTO } from 'src/app/modules/instrument/dto/instrument-dto';
import { InstrumentService } from 'src/app/modules/instrument/service/instrument.service';
import { TransactionType } from 'src/app/modules/shared/enum/transaction-type.enum';
import { getNextThursday, toDateStr } from 'src/app/modules/shared/util/date-util';
import { OptionsDTO } from '../../dto/options-dto';
import { OptionsInDTO } from '../../dto/options-in-dto';
import { OptionsType } from '../../enum/option-type.enum';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss']
})
export class OptionsFormComponent implements OnInit, OnChanges {
  @Input() optionsDTO: OptionsDTO = {} as OptionsDTO;
  @Output() onChange: EventEmitter<void> = new EventEmitter();

  editMode = false;
  TransactionType = TransactionType;
  instrumentDTOs: InstrumentDTO[] = [];

  formGroup: FormGroup = this._fb.group({
    instrumentName: [this.optionsDTO?.instrumentDTO?.name, Validators.required],
    strikePrice: [this.optionsDTO.strikePrice, Validators.required],
    optionsType: [this.optionsDTO.optionsType, Validators.required],
    expiryDate: [this.optionsDTO.expiryDate, Validators.required],
    price: [this.optionsDTO.price, Validators.required],
    lots: [this.optionsDTO.lots, Validators.required],
    note: [this.optionsDTO.note]
  });

  constructor(private _instrumentService: InstrumentService, private _fb: FormBuilder, private _service: OptionsService) { }

  ngOnInit(): void {
    this.fetchInstruments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const optionsDTO = changes['optionsDTO'].currentValue;
    this.patchForm(optionsDTO);
    this.editMode = optionsDTO.id !== 0;
  }

  save(transactionType: TransactionType): void {
    this._service.save(this.compileInDTO(transactionType)).pipe(first()).subscribe(_ => this.onSuccess());
  }

  update(): void {
    this._service.update(this.optionsDTO.id, this.compileInDTO(this.optionsDTO.transactionType)).pipe(first()).subscribe(_ => this.onSuccess());
  }

  reset(): void {
    this.formGroup.reset()
    this.formGroup.patchValue({
      lots: 1,
      optionsType: OptionsType.CALL,
      expiryDate: getNextThursday()
    })
    this.editMode = false;
  }

  private onSuccess(): void {
    this.onChange.emit();
    this.formGroup.get('price')?.reset();
    this.editMode = false;
  }

  private compileInDTO(transactionType: TransactionType): OptionsInDTO {
    return {
      instrumentName: this.formGroup.get('instrumentName')?.value,
      strikePrice: this.formGroup.get('strikePrice')?.value,
      expiryDate: this.formGroup.get('expiryDate')?.value,
      optionsType: this.formGroup.get('optionsType')?.value,
      price: this.formGroup.get('price')?.value,
      lots: this.formGroup.get('lots')?.value,
      transactionType: transactionType,
      note: this.formGroup.get('note')?.value,
    }
  }

  private patchForm(optionsDTO: OptionsDTO): void {
    this.formGroup.patchValue({
      ...optionsDTO,
      instrumentName: optionsDTO?.instrumentDTO?.name,
      expiryDate: toDateStr(optionsDTO?.expiryDate)
    });
  }

  private fetchInstruments(): void {
    this._instrumentService.findAll().subscribe(dtos => this.instrumentDTOs = dtos);
  }

}
