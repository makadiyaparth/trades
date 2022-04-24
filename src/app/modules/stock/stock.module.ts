import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockTradesComponent } from './components/stock-trades/stock-trades.component';
import { SharedModule } from '../shared/shared.module';
import { StockService } from './service/stock.service';
import { InstrumentService } from '../instrument/service/instrument.service';


@NgModule({
  declarations: [
    StockComponent,
    StockFormComponent,
    StockTradesComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ],
  providers: [StockService, InstrumentService]
})
export class StockModule { }
