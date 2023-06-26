import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
// Libreria para observables
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  // === Método constructor --------------------------------------
  constructor ( 
    private activatedRoute:ActivatedRoute,
    private countriesService:CountriesService,
    private router: Router,
    ) {}

  // === Observables ---------------------------------------------
  ngOnInit(): void {

    this.activatedRoute.params
      .pipe( // "switchMap" recibe observable y retorna uno nuevo
        switchMap( ({ id })=> this.countriesService.searchCode(id)),
      )
      .subscribe(country=> {
        // "navigateByUrl" navega por las rutas
        if (!country) return this.router.navigateByUrl('');

        return this.country= country;

      });

  } 

}
