import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { PRICES, CURRENCIES } from './mock/price';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  valueFormControl = new FormControl(0);
  cryptoFormControl = new FormControl('');
  currencyFormControl = new FormControl('');

  filteredCrypto: Observable<string[]> = new Observable();
  filteredCurrency: Observable<string[]> = new Observable();

  // Para reiniciar los inputs
  value: number | null = null ;
  filterCrypto = '';
  filterCurrency = '';
  calculatedResult: number = 0;

  // TODO: Replace for real values
  allPrices: string[] = PRICES.map((p) => p.name);
  allCurrencies: string[] = CURRENCIES;

  ngOnInit() {
    this.filteredCrypto = this.cryptoFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCrypto(value || ''))
    );

    this.filteredCurrency = this.currencyFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.valueFormControl.valueChanges.subscribe((newValue) => {
      if(newValue != null) this.calculatedResult = newValue

      // TODO: Consumir la calculadora, y mostrar

    });
  }

  _filterCrypto(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allPrices.filter((allPrices) => allPrices.toLowerCase().includes(filterValue)
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCurrencies.filter((allCurrencies) => allCurrencies.toLowerCase().includes(filterValue)
    );
  }
 
}
