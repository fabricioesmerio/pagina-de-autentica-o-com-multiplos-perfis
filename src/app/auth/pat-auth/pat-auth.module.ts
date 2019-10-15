import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatAuthComponent } from './pat-auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PatAuthComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PatAuthModule { }
