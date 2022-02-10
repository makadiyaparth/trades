import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { OptionsFormComponent } from './options-form/options-form.component';
import { OptionsTradesComponent } from './options-trades/options-trades.component';


@NgModule({
  declarations: [
    OptionsComponent,
    OptionsFormComponent,
    OptionsTradesComponent
  ],
  imports: [
    CommonModule,
    OptionsRoutingModule
  ]
})
export class OptionsModule { }
