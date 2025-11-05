import { DecimalPipe } from '@angular/common';
import { Country } from './../../../interfaces/country';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {

  country = input.required<Country>()
   currentYear = computed(() => {
    return new Date().getFullYear();
  });

}
