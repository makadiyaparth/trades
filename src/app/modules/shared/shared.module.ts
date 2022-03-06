import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FocusDirective } from './directive/focus.directive';

@NgModule({
  declarations: [HeaderComponent, FocusDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, FocusDirective, ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
})
export class SharedModule { }
