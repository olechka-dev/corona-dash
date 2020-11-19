import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from '../../shared/types/city.types';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input() cityControl: FormControl;
    @Input() options$: Observable<City[]>;
    @Output() onCityListUpdate = new EventEmitter<City[]>();

    selectedCities: City[] = [];
    placeHolder = 'Search Location';

    constructor() {
    }

    ngOnInit(): void {
        this.cityControl.registerOnDisabledChange((isDisabled) => {
            this.placeHolder = isDisabled ? 'Maximum of 5 cities reached' : 'Search Location';
        });
    }

    onCityRemove(city): void {
        const index = this.selectedCities.findIndex((item) => item._id === city.id);
        this.selectedCities.splice(index, 1);
        this.onCityListUpdate.emit(JSON.parse(JSON.stringify(this.selectedCities)));
        if (this.cityControl.disabled) {
            this.cityControl.enable();
        }
    }

    onCitySelected(e: MatAutocompleteSelectedEvent): void {
        const city = e.option.value;
        this.cityControl.reset();
        if (!this.selectedCities.find((item) => item._id === city.id)) {
            this.selectedCities.push(city);
            this.onCityListUpdate.emit(JSON.parse(JSON.stringify(this.selectedCities)));
        }
        if (this.selectedCities.length === 5) {
            this.cityControl.disable();
        }
    }

}
