import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { getDateAndMonth } from 'src/app/modules/shared/util/date-util';
import { OptionsDTO } from '../../dto/options-dto';
import { OptionsType } from '../../enum/option-type.enum';
import { OptionsService } from '../../service/options.service';

@Component({
  selector: 'app-options-trades',
  templateUrl: './options-trades.component.html',
  styleUrls: ['./options-trades.component.scss']
})
export class OptionsTradesComponent implements OnInit {
  @Input() refreshList$ = new BehaviorSubject<boolean>(true);
  @Output() onEdit = new EventEmitter<OptionsDTO>();

  optionsDTOs$: Observable<OptionsDTO[]> = new Observable();
  optionsDTOs: OptionsDTO[] = [];
  optionsMap: Map<string, OptionsDTO[]> = new Map();

  constructor(private _service: OptionsService) { }

  ngOnInit(): void {
    this.refreshList$.pipe(switchMap(_ => this._service.findAll())).subscribe(dtos => {
      this.optionsDTOs = dtos;
      this.populateMap();
    });
  }

  edit(optionsDTO: OptionsDTO): void {
    this.onEdit.emit(optionsDTO);
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
