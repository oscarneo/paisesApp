import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencia: Boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencia = false;

    this.paisService.buscarPais(this.termino)
      .subscribe((resp)=>{
        console.log(resp);
        this.paises = resp;
      }, (err) =>{
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencia = true;

    this.paisService.buscarPais( termino )
    .subscribe( paises => 
      this.paisesSugeridos = paises.splice(0,5),
      (err) => this.paisesSugeridos = []
      )
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
