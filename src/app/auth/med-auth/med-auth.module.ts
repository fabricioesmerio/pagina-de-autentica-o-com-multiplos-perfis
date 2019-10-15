import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedAuthComponent } from './med-auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MedAuthComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MedAuthModule { }
