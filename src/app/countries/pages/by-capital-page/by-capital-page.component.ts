import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  // === Arreglo de Países -----------------------------------------------
  public countries: Country[]= [];
  public Loading: boolean= false; // Indica si está o no cargando
  public initialValue: string= '';

  // === Método constructor ----------------------------------------------
  constructor( private countriesService: CountriesService ) {}

  // === OnInit ----------------------------------------------------------
  ngOnInit(): void {
    this.countries= this.countriesService.cache.byCapital.countries;
    this.initialValue= this.countriesService.cache.byCapital.term;
  }

  // === Métodos ---------------------------------------------------------
  searchByCapital(term:string):void{

    this.Loading= true;

      this.countriesService.searchCapital( term )
      .subscribe(countries=> { // Se suscribe para recibir los resultados
        this.countries= countries;

        this.Loading= false;
      });
  }

}
