import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

/* ---------------------------------- INFO -----------------------------------------
Cuando un componente se inicializa, la función "OnInit" genera los cambios que -----
nosotros le especifiquemos dentro de su rango de parámetros, por el contrario, -----
"OnDestroy" se ejecuta cunado el componente se deja de cargar en pantalla (destruye)
 -------------------------------------------------------------------------------- */

export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer= new Subject<string>; // Tipo especial de observable >>RXJS<<
  private debouncerSubscription?: Subscription; // Suscripción de "debouncer"

  @Input() // Placeholder de la barra de búsqueda
  public placeholder: string= '';

  @Input()
  public initialValue: string= '';
  
  /* @Output() // Evento de búsqueda
  public onValue= new EventEmitter<string>();
                                <<DESACTIVADO>>                                */

  @Output() // Evento de búsqueda
  public onDebounce= new EventEmitter<string>();

  // === OnInit -----------------------------------------------------------------
  ngOnInit(): void {
    this.debouncerSubscription= this.debouncer // Almacena la suscripción 
      .pipe(
        debounceTime(400) // Una barrera de delay 
      )
      .subscribe( value=> {
        this.onDebounce.emit( value );
      });
  }
  // === OnDestroy --------------------------------------------------------------
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
    // "unsubscribe" libera la información retenida en una subscripción
  }

  // === Métodos ----------------------------------------------------------------
  /* emitValue(value:string):void{ // "emit" emite un evento con el valor recibido
    this.onValue.emit( value );
  }                              <<DESACTIVADO>>                                */

  onKeyPress( search:string ){
    this.debouncer.next( search );
  }

}
