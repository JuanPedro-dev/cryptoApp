import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { CURRENCIES, Crypto } from './interface/ICrypto';
import { calculatorService } from './service/calculador.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  private calculatorService: calculatorService = inject(calculatorService);
  private subs: Subscription = new Subscription();

  showResult = false;
  price: number = 0;

  // Formulario
  form!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  valueFormControl = new FormControl();
  cryptoFormControl = new FormControl('', Validators.required);
  currencyFormControl = new FormControl('', Validators.required);

  // Valores iniciales (filtrar)
  CURRENCIES = CURRENCIES;
  cryptoCalculator: Crypto = { Data: [], RAW: [] };

  // Valores Filtrados (Mostrar)
  filteredCrypto: Observable<string[]> = new Observable();
  filteredCurrency: Observable<string[]> = new Observable();

  ngOnInit() {
    this.form = this.formBuilder.group({
      cryptoFormControl: this.cryptoFormControl,
      currencyFormControl: this.currencyFormControl,
    });

    this.getOptionsCrypto();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  /**
   *  Updating the selection options in cryptoFormControl
   */
  getOptionsCrypto(): void {
    this.subs.add(
      this.calculatorService.getCryptoList().subscribe({
        next: (data: Crypto) => (this.cryptoCalculator = data),
        error: (error) => console.error('Error: getCrypto() => ', error),
      })
    );
  }

  calculate() {
    const divisaSeleccionada: any = this.currencyFormControl.value;
    const criptomonedaSeleccionada: any = this.cryptoFormControl.value;
    if (divisaSeleccionada && criptomonedaSeleccionada) {
      this.subs.add(
        this.calculatorService
          .getResponseCrypto(criptomonedaSeleccionada, divisaSeleccionada)
          .subscribe(
            (data) => {
              if (
                data.RAW[criptomonedaSeleccionada] &&
                data.RAW[criptomonedaSeleccionada][divisaSeleccionada]
              ) {
                const { PRICE } =
                  data.RAW[criptomonedaSeleccionada][divisaSeleccionada];
                this.price = +PRICE.toFixed(2);
                this.price *= this.valueFormControl.value;
                this.showResult = true;
              }
            },
            (error) =>
              console.error(
                'Error al consultar datos de la criptomoneda:',
                error
              )
          )
      );
    }
  }
}
