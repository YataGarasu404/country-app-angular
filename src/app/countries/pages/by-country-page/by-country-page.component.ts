import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  // === Arreglo de Países ------------------------------------------------
  public countries: Country[]= [];
  public Loading: boolean= false; // Indica si está o no cargando
  public initialValue: string= '';

  // === Método constructor -----------------------------------------------
  constructor( private countriesService: CountriesService ) {}

  // === OnInit -----------------------------------------------------------
  ngOnInit(): void {
    this.countries= this.countriesService.cache.byCountry.countries;
    this.initialValue= this.countriesService.cache.byCountry.term;
  }

  // === Métodos ----------------------------------------------------------
  searchByCountry(term:string):void{

    this.Loading= true;

      this.countriesService.searchCountry( term )
      .subscribe(countries=> { // Se suscribe para recibir los resultados
        this.countries= countries;

        this.Loading= false;
      });
  }

}
