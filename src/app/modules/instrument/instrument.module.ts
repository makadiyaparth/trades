import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentComponent } from './instrument.component';

@NgModule({
  declarations: [InstrumentComponent],
  imports: [CommonModule, InstrumentRoutingModule],
})
export class InstrumentModule {}
