import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentRoutingModule } from './instrument-routing.module';
import { InstrumentComponent } from './instrument.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { InstrumentFormComponent } from './components/instrument-form/instrument-form.component';
import { SharedModule } from '../shared/shared.module';
import { InstrumentService } from './service/instrument.service';

@NgModule({
  declarations: [InstrumentComponent, InstrumentsComponent, InstrumentFormComponent],
  imports: [CommonModule, SharedModule, InstrumentRoutingModule],
  providers: [InstrumentService]
})
export class InstrumentModule {}
