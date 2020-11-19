import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'stat',
        loadChildren: () => import('./stat/stat.module').then(m => m.StatModule)
    },
    {
        path: '**',
        redirectTo: 'stat'
    },
];

export const appRouter: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
