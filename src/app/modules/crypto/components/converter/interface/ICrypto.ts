interface CoinInfo {
  Name: string;
  FullName: string;
}

interface CurrencyData {
  PRICE: number;
}

interface Raw {
  [criptomoneda: string]: CurrencyData;
}

interface Data {
  CoinInfo: CoinInfo;
}

export interface Crypto {
  Data: Data[];
  RAW: Raw[];
}

export const CURRENCIES: { [key: string]: string } = {
  ARS: 'Peso Argentino',
  USD: 'Dólar Estadounidense',
  EUR: 'Euro'
};
