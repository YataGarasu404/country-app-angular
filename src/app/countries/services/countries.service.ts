import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// "rxjs" Libreria para trabajar con Observables
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
//  Interfaces
import { Country } from '../interfaces/country.interface';
import { CacheStorage } from '../interfaces/cache.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string= 'https://restcountries.com/v3.1'; // API
  private timeDelay: number= 1000; // Tiempo de carga del loader

  // Almacena la búsqueda y el resultado 
  public cache: CacheStorage= {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { region: '', countries: [] },
  }

  // === Método de búsqueda --------------------------------------
  private getCountries( url:string ): Observable<Country[]>{
  // Retorna un "observable" 
    return this.http.get<Country[]>( url )
      .pipe(
  // "catchError" atrapa el error, "of" retorna un valor
        catchError( ()=> of([]) ),
        delay(this.timeDelay),
      );
  }

  // === Método Constructor --------------------------------------
  constructor(private http: HttpClient) {
    // Se llama en el "constructor" para que inicie con la página
    this.loadFromLocalStorage();
  }
  
  private saveToLocalStorage() {
    localStorage.setItem('cache', JSON.stringify(this.cache)) 
  }

  private loadFromLocalStorage() {
    if(!localStorage.getItem('cache')) return; // Verifica si ya tiene el caché

    this.cache= JSON.parse(localStorage.getItem('cache')!);
    // "!" se usa porque en este paso debería existir "localStorage"
  }

  // === Método de "more info" -----------------------------------
  searchCode( code:string ): Observable<Country | null>{
  //  Creamos una URL para la búsqueda 
    const url = `${ this.apiUrl }/alpha/${ code }`;
  // Retorna un "observable" 
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries=> countries.length>0 ? countries[0]: null),
  // "catchError" atrapa el error, "of" retorna un valor
      catchError( ()=> of(null) ),
      delay( this.timeDelay ),
    );
  }

  // === Método de búsqueda de capitales -------------------------
  searchCapital( term:string ): Observable<Country[]>{
  // URL para la búsqueda 
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountries( url )
      .pipe(
        tap(countries=> this.cache.byCapital= {term, countries}),
        tap( () => this.saveToLocalStorage() ), 
        // El último "tap" lama el método de localStorage
        );
  }

  // === Método de búsqueda de países ----------------------------
  searchCountry( term:string ): Observable<Country[]>{
  // URL para la búsqueda 
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountries( url )
      .pipe(
        tap(countries=> this.cache.byCountry= {term, countries}),
        tap( () => this.saveToLocalStorage() ), 
        // El último "tap" lama el método de localStorage
        );
  }
  
  // === Método de búsqueda de regiones --------------------------
  searchRegion( region:Region ): Observable<Country[]>{
  // URL para la búsqueda 
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountries( url )
      .pipe(
        tap(countries=> this.cache.byRegion= {region, countries}),
        tap( () => this.saveToLocalStorage() ), 
        // El último "tap" lama el método de localStorage
        );
  }
  
}