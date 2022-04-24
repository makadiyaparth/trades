import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'stocks',
    loadChildren: () =>
      import('./modules/stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./modules/options/options.module').then((m) => m.OptionsModule),
  },
  {
    path: 'futures',
    loadChildren: () =>
      import('./modules/future/future.module').then((m) => m.FutureModule),
  },
  {
    path: 'instruments',
    loadChildren: () =>
      import('./modules/instrument/instrument.module').then(
        (m) => m.InstrumentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
