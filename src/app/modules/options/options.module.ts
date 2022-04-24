import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { OptionsFormComponent } from './components/options-form/options-form.component';
import { OptionsTradesComponent } from './components/options-trades/options-trades.component';
import { InstrumentService } from '../instrument/service/instrument.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OptionsComponent,
    OptionsFormComponent,
    OptionsTradesComponent,
  ],
  imports: [CommonModule, OptionsRoutingModule, SharedModule],
  providers: [InstrumentService]
})
export class OptionsModule { }
