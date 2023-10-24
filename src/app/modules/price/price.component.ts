import { Component, OnInit } from '@angular/core';
import { Price } from '../price/interface/price';
import { ServiceApiCripto } from '../price/service/service-api.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-precio',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  cryptoData: Price[] = [];

  constructor(private criptoDatax: ServiceApiCripto) {}

  ngOnInit() {
    this.getListCripto().subscribe(data => {
      this.cryptoData = data;
      console.log(this.cryptoData); // Puedes usar los datos en tu componente
    });
  }

  getListCripto(): Observable<Price[]> {
    return this.criptoDatax.getListCriptoPrice().pipe(
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}