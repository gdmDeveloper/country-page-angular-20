import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { catchError, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital.html',
})
export class ByCapital {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal<string>(this.queryParam);
  router = inject(Router)


  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>  {

      if(!params.query) return of([]);

      this.router.navigate(['/country/by-capital/'], {
        queryParams: {
          query: this.query(),
          guillem: "chulito"
        }
      })

      return this.countryService.searchByCapital(params.query)
      .pipe(
        catchError(error => {
          return of([])
        })
      )

    }
  })








  //* SE CAMBIA EL CÓDIGO DE AQUÍ POR LOS RESOURCES (v.19 EXPERIMENTAL) *//
  // countries = signal<Country[]>([])

  // isLoading = signal(false);
  // hasError = signal<string | null>(null);

  // searchByCapital(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null)

  //   // Llamada al servicio que devuelve un Observable<Country[]>

  //   this.countryService.searchByCapital(query)
  //   .subscribe( (countries) => {
  //     this.countries.set(countries);
  //     this.isLoading.set(false);
  //   })

  //   }

}


