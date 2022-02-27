import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { InstrumentDTO } from '../../dto/instrument-dto';
import { InstrumentService } from '../../service/instrument.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {
  @Input() refreshList$ = new BehaviorSubject<boolean>(true);
  @Output() onEdit = new EventEmitter<InstrumentDTO>();

  instrumentDTOs$: Observable<InstrumentDTO[]> = new Observable();

  constructor(private _service: InstrumentService) { }

  ngOnInit(): void {
    this.instrumentDTOs$ = this.refreshList$.pipe(switchMap(_ => this._service.findAll()));
  }

  edit(instrumentDTO: InstrumentDTO): void {
    this.onEdit.emit(instrumentDTO);
  }

  delete(id: number): void {
    this._service.delete(id).subscribe(_ => this.refreshList());
  }

  refreshList(): void {
    this.refreshList$.next(true);
  }
}
