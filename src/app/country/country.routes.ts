import { Routes } from '@angular/router';
import { CountryLayout } from './layouts/country-layout/country-layout';
import { ByRegion } from './pages/by-region/by-region';
import { ByCountry } from './pages/by-country/by-country';
import { ByCapital } from './pages/by-capital/by-capital';

export const countryRoutes: Routes = [

  {
    path: '',
    component: CountryLayout,
    children: [

      {
        path: 'by-capital',
        component: ByCapital
      },

      {
        path: 'by-country',
        component: ByCountry
      },

      {
        path: 'by-region',
        component: ByRegion
      },

      {
        path: '**',
        redirectTo: 'by-capital'
      }

    ]
  },



];

export default countryRoutes
