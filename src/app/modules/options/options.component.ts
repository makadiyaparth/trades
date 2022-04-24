import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getNextThursday } from '../shared/util/date-util';
import { OptionsDTO } from './dto/options-dto';
import { OptionsType } from './enum/option-type.enum';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  refreshList$ = new BehaviorSubject<boolean>(true);
  optionsDTO: OptionsDTO = { id: 0, optionsType: OptionsType.CALL, lots: 1, expiryDate: getNextThursday() } as OptionsDTO;

  edit(optionsDTO: OptionsDTO): void {
    this.optionsDTO = optionsDTO;
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }
}
