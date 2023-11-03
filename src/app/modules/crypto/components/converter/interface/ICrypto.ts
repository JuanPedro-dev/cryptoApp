interface CoinInfo {
  Name: string;
  FullName: string;
}

interface DISPLAY {
  PRICE: number;
}


interface CurrencyData {
  PRICE: number;
  HIGHDAY: number;
  LOWDAY: number;
  CHANGEPCT24HOUR: number;
  OPENDAY: number;
 
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

