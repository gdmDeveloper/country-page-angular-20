import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country',
  imports: [NotFound, CountryInformation],
  templateUrl: './country.html',
})
export class Country {

  countryCode = inject(ActivatedRoute).snapshot.params['code']
  countryService = inject(CountryService);

countryResource = rxResource({
    params: () => this.countryCode,
    stream: ({ params: code }) => {
      return this.countryService.searchCountryByAlphaCode(code);
    }
  });


}
