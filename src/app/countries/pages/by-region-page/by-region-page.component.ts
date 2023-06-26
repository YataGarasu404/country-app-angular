import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  // === Varariables, Constantes, etc --------------------------------------
  public countries: Country[]= [];
  public regions: Region[]= ['Africa','Americas','Asia','Europe','Oceania'];
  public selected?: Region;
  public Loading: boolean= false; // Indica si está o no cargando

  // === Método constructor ------------------------------------------------
  constructor( private countriesService: CountriesService ) {}
  
  ngOnInit(): void {
    this.countries= this.countriesService.cache.byRegion.countries;
    this.selected= this.countriesService.cache.byRegion.region;
  }

  searchByRegion(region:Region):void{

    this.Loading= true;

    this.selected= region; // Guarda la opción seleccionada

    this.countriesService.searchRegion( region )
    .subscribe(countries=> { // Se suscribe para recibir los resultados
      this.countries= countries;

      this.Loading= false;
    });
  }

}
