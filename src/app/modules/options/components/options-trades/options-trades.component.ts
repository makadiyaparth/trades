import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { getDateAndMonth, getToday } from 'src/app/modules/shared/util/date-util';
import { OptionsDTO } from '../../dto/options-dto';
import { OptionsType } from '../../enum/option-type.enum';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'app-options-trades',
  templateUrl: './options-trades.component.html',
})
export class OptionsTradesComponent implements OnInit {
  @Input() refreshList$ = new BehaviorSubject<boolean>(true);
  @Output() onEdit = new EventEmitter<OptionsDTO>();

  optionsDTOs$: Observable<OptionsDTO[]> = new Observable();
  optionsDTOs: OptionsDTO[] = [];
  optionsMap: Map<string, OptionsDTO[]> = new Map();

  date: string = getToday();

  constructor(private _service: OptionsService) { }

  ngOnInit(): void {
    this.refreshList$.pipe(filter(_ => !!this.date), switchMap(_ => this._service.findAll(this.date))).subscribe(dtos => {
      this.optionsDTOs = dtos;
      this.populateMap();
    });
  }

  edit(optionsDTO: OptionsDTO): void {
    this.onEdit.emit(optionsDTO);
  }

  newLike(key: string): void {
    const optionsDTOs = this.optionsMap.get(key);

    if (optionsDTOs && optionsDTOs.length > 0) {
      const optionsDTO = optionsDTOs[0];

      const newOptionsDTO = {
        id: 0,
        instrumentDTO: optionsDTO.instrumentDTO,
        strikePrice: optionsDTO.strikePrice,
        optionsType: optionsDTO.optionsType,
        expiryDate: optionsDTO.expiryDate,
        lots: 1
      } as OptionsDTO;

      this.onEdit.emit(newOptionsDTO);
    }
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }

  private populateMap(): void {
    this.optionsMap.clear();
    this.optionsDTOs.forEach(dto => {
      const key = this.generateKey(dto);
      if (this.optionsMap.has(key)) {
        const dtos = this.optionsMap.get(key) ?? [];
        this.optionsMap.set(key, [...dtos, dto]);
      } else {
        this.optionsMap.set(key, [dto]);
      }
    });
  }

  private generateKey(optionsDTO: OptionsDTO): string {
    const { instrumentDTO, expiryDate, strikePrice, optionsType } = optionsDTO;
    return `${instrumentDTO.name} ${getDateAndMonth(expiryDate)} ${strikePrice} ${this.getShortForm(optionsType)}`;
  }

  private getShortForm(optionsType: OptionsType): string {
    return optionsType === OptionsType.CALL ? 'CE' : 'PE';
  }
}
