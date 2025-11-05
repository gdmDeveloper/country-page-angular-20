import { RESTCountries } from '../interfaces/restCountries';
import { Country } from '../interfaces/country';

export class CountryMapper {


  static mapArrayCountriesToCountry(country: RESTCountries): Country {
    return {
  cca2: country.cca2,
  flag: country.flag,
  flagSvg: country.flags.svg,
  name: country.translations["spa"].common,
  capital: country.capital?.length ? country.capital.join(',') : 'No consta capital',
  population: country.population,
  region: country.region,
  subRegion: country.subregion
}
  }

  static mapRestCountriesToArrayCountries(countries: RESTCountries[]): Country[] {
    return countries.map(this.mapArrayCountriesToCountry)
  }


}
