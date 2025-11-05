import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { RouterLinkActive } from "@angular/router";
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

@Component({
  selector: 'app-by-region',
  imports: [CountryList, RouterLinkActive],
  templateUrl: './by-region.html',
})
export class ByRegion {

  countryService = inject(CountryService);
  query = signal<string>('')

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>  {

      if(!params.query) return of([]);

      return this.countryService.searchByRegion(params.query)
      .pipe(
        catchError(error => {
          return of([])
        })
      )

    }
  })

}
