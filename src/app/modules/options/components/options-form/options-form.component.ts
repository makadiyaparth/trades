import { Component, OnInit } from '@angular/core';
import { InstrumentDTO } from 'src/app/modules/instrument/dto/instrument-dto';
import { InstrumentService } from 'src/app/modules/instrument/service/instrument.service';

@Component({
  selector: 'app-options-form',
  templateUrl: './options-form.component.html',
  styleUrls: ['./options-form.component.scss']
})
export class OptionsFormComponent implements OnInit {
  public instrumentDTOs: InstrumentDTO[] = [];

  constructor(private _instrumentService: InstrumentService) { }

  ngOnInit(): void {
    this.fetchInstruments();
  }

  private fetchInstruments(): void {
    this._instrumentService.findAll().subscribe(dtos => this.instrumentDTOs = dtos);
  }

}
