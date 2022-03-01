import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { OptionsFormComponent } from './components/options-form/options-form.component';
import { OptionsTradesComponent } from './components/options-trades/options-trades.component';
import { InstrumentService } from '../instrument/service/instrument.service';

@NgModule({
  declarations: [
    OptionsComponent,
    OptionsFormComponent,
    OptionsTradesComponent,
  ],
  imports: [CommonModule, OptionsRoutingModule],
  providers: [InstrumentService]
})
export class OptionsModule { }
