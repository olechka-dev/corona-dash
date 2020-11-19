import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatContainerComponent } from './stat-container/stat-container.component';

const routes: Routes = [
    {
        path: '',
        component: StatContainerComponent
    }
];

export const statRouter: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

