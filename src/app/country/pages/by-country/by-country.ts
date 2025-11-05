import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { rxResource } from "@angular/core/rxjs-interop";
import { catchError, firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);


  router = inject(Router);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {

      if (!params.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: this.query()
        }
      })

      return this.countryService.searchByCountry(params.query)
        .pipe(
          catchError(error => {
            return of([])
          })
        )
    }
  })


}
