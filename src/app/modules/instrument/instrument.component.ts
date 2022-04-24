import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InstrumentDTO } from './dto/instrument-dto';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent {
  refreshList$ = new BehaviorSubject<boolean>(true);
  instrumentDTO: InstrumentDTO = { id: 0, name: '', description: '' };

  edit(instrumentDTO: InstrumentDTO): void {
    this.instrumentDTO = instrumentDTO;
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }
}
