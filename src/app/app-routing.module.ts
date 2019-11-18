import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedAuthComponent } from './auth/med-auth/med-auth.component';
import { PatAuthComponent } from './auth/pat-auth/pat-auth.component';
import { MedAuthModule } from './auth/med-auth/med-auth.module';
import { PatAuthModule } from './auth/pat-auth/pat-auth.module';
import { IndexComponent } from './auth/index/index.component';

const routes: Routes = [
  { path: 'auth/med', component: MedAuthComponent },
  { path: 'auth/pat', component: PatAuthComponent },
  { path: 'auth', component: IndexComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [
    MedAuthModule,
    PatAuthModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
