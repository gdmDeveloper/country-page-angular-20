import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RESTCountries } from '../interfaces/restCountries';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountryService {


  private http = inject(HttpClient);
  private cacheSearchCapital = new Map<string, Country[]>();
  private cacheSearchCountry = new Map<string, Country[]>();
  private cacheSearchRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.cacheSearchCapital.has(query)) {
      return of(this.cacheSearchCapital.get(query)!)
    }
    return this.http.get<RESTCountries[]>(`${environment.API_URL}/capital/${query}`)
      .pipe(
        map((countries) => CountryMapper.mapRestCountriesToArrayCountries(countries)),
        tap((countries) => this.cacheSearchCapital.set(query, countries)),
        catchError(err => {
          return throwError(() => new Error(`Error obteniendo países con la capital: ${query}`))
        })
      )
  }



  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.cacheSearchCountry.has(query)) {
      return of(this.cacheSearchCountry.get(query)!)
    }
    return this.http.get<RESTCountries[]>(`${environment.API_URL}/name/${query}`)
      .pipe(
        map((countries) => CountryMapper.mapRestCountriesToArrayCountries(countries)),
        tap((countries) => this.cacheSearchCountry.set(query, countries)),
        catchError(err => {
          return throwError(() => new Error(`Error obteniendo países con el nombre: ${query}`))
        })
      )

  }

  searchCountryByAlphaCode(query: string): Observable<Country | undefined> {
    query = query.toLocaleLowerCase();
    return this.http.get<RESTCountries[]>(`${environment.API_URL}/alpha/${query}`)
      .pipe(
        map((countries) => CountryMapper.mapRestCountriesToArrayCountries(countries)),
        map(countries => countries.at(0)),
        catchError(err => {
          return throwError(() => new Error(`No se pudo obtener un país con ese código: ${query}`))
        })
      )
  }


  searchByRegion(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.cacheSearchRegion.has(query)) {
      return of(this.cacheSearchRegion.get(query)!)
    }
    return this.http.get<RESTCountries[]>(`${environment.API_URL}/region/${query}`)
      .pipe(
        map((countries) => CountryMapper.mapRestCountriesToArrayCountries(countries)),
        tap((countries) => this.cacheSearchRegion.set(query, countries)),
        catchError(err => {
          return throwError(() => new Error(`Error obteniendo países con la región: ${query}`))
        })
      )

  }



}
