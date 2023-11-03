import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { CURRENCIES } from './mock/price';
import { ServiceCrypotoCalculator } from './service/calculador-service';
import { Crypto } from './interface/ICrypto';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  CURRENCIES = CURRENCIES;
  cryptoCalculator: Crypto = { Data: [], RAW: [] };
  cryptoFormControl = new FormControl('');
  currencyFormControl = new FormControl('');
  filteredCrypto: Observable<string[]> = new Observable();
  filteredCurrency: Observable<string[]> = new Observable();
  allCurrencies: { [key: string]: string } = CURRENCIES;
  price: number | undefined;
  highday: number | undefined;
  lowday: number | undefined;
  changepct24hour :number | undefined;
  openday :  number | undefined;

  cotizacionRealizada = false;

  constructor(private cyptoCalculatorResponse: ServiceCrypotoCalculator) {}
  private subscription: Subscription = new Subscription();

  getCrypto() {
    this.subscription = this.cyptoCalculatorResponse.getCriptolist().subscribe(
      (data: Crypto) => {
        this.cryptoCalculator = data;       
      },
      (error) => console.error('Error fetching Crypto data:', error)
    );
  }

  cotizarDivisasYCriptomoneda() {
    const divisaSeleccionada : any= this.currencyFormControl.value;
    const criptomonedaSeleccionada: any = this.cryptoFormControl.value;  
    if (divisaSeleccionada && criptomonedaSeleccionada) {      
      this.cyptoCalculatorResponse.getResponseCrypto(criptomonedaSeleccionada, divisaSeleccionada).subscribe(
        (data) => {
          if (data.RAW[criptomonedaSeleccionada] && data.RAW[criptomonedaSeleccionada][divisaSeleccionada]) {
            const { PRICE , HIGHDAY, LOWDAY ,CHANGEPCT24HOUR , OPENDAY } = data.RAW[criptomonedaSeleccionada][divisaSeleccionada];
            this.price = +PRICE.toFixed(2);
            this.highday = +HIGHDAY.toFixed(2);
            this.lowday = +LOWDAY.toFixed(2);
            this.changepct24hour = +CHANGEPCT24HOUR.toFixed(2);
            this.openday = +OPENDAY.toFixed(2);
          }
          this.cotizacionRealizada = true;
        },
        (error) => {
          console.error('Error al consultar datos de la criptomoneda:', error);
        }
      );
    } else {
      console.log('Selecciona una divisa y una criptomoneda antes de cotizar.');
    }
  }

  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getCrypto();

    this.filteredCurrency = this.currencyFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const keys = Object.keys(this.allCurrencies);
    return keys.filter((key) => key.toLowerCase().includes(filterValue));
  }
}
