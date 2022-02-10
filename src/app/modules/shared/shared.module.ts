import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const exports = [HeaderComponent];

@NgModule({
  declarations: [...exports],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [...exports],
})
export class SharedModule {}
