import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dictionary/:word',
    loadComponent: () => import('./dictionary/dictionary.page').then( m => m.DictionaryPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
];
