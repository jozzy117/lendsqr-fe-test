import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'lendsqr',
    loadChildren: () => import('./@components/lendsqr.module').then(m => m.LendsqrModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
