import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CURRENCIES, Crypto } from './interface/ICrypto';
import { calculatorService } from './service/calculador.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  private calculatorService: calculatorService = inject(calculatorService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private subs: Subscription = new Subscription();

  showResult = false;
  price: number = 0;

  // Formulario
  form!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  valueFormControl = new FormControl();
  cryptoFormControl = new FormControl('', Validators.required);
  currencyFormControl = new FormControl('', Validators.required);

  CURRENCIES = CURRENCIES;
  cryptoCalculator: Crypto = { Data: [], RAW: [] };

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
      const subscription = this.calculatorService.getResponseCrypto(criptomonedaSeleccionada, divisaSeleccionada)
        .subscribe({
          next: (crypto: Crypto) => {
            try {
              if (
                crypto.RAW[criptomonedaSeleccionada] &&
                crypto.RAW[criptomonedaSeleccionada][divisaSeleccionada]
              ) {
                const { PRICE } =
                  crypto.RAW[criptomonedaSeleccionada][divisaSeleccionada];
                this.price = +PRICE.toFixed(2);
                this.price *= this.valueFormControl.value;
                this.showResult = true;
              }
            } catch {
              this.launchError();
              this.valueFormControl.reset();
              this.cryptoFormControl.reset();
              this.currencyFormControl.reset();
              this.showResult = false;
            }
          },
          error: (error) =>
            console.error('Error: getResponseCrypto() =>', error),
        });
      this.subs.add(subscription);
    }
  }

  launchError(): void {
    this._snackBar.open(
      'Verificar que los datos pertenezcan a los disponibles!', '',
      {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      }
    );
  }
}
