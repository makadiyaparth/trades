import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockTradesComponent } from './components/stock-trades/stock-trades.component';


@NgModule({
  declarations: [
    StockComponent,
    StockFormComponent,
    StockTradesComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
