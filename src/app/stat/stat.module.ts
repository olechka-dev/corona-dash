import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatContainerComponent } from './stat-container/stat-container.component';
import { statRouter } from './stat-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { SearchComponent } from './search/search.component';


@NgModule({
    declarations: [StatContainerComponent, ChartComponent, SearchComponent],
    imports: [
        CommonModule,
        statRouter,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        ChartsModule
    ]
})
export class StatModule {
}
