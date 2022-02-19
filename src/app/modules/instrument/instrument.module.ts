import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentComponent } from './instrument.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { InstrumentFormComponent } from './components/instrument-form/instrument-form.component';

@NgModule({
  declarations: [InstrumentComponent, InstrumentsComponent, InstrumentFormComponent],
  imports: [CommonModule, InstrumentRoutingModule],
})
export class InstrumentModule {}
