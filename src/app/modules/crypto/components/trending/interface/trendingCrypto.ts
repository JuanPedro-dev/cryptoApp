interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
}
interface Coin {
  item: Item;  
}

export interface Trending {
  coins: Coin[];
  nfts: Nft[]; 
}
interface Nft {
  id: number;
  name: string;
  symbol: string;
  thumb: string;
  native_currency_symbol: string;
  floor_price_in_native_currency: string;

}
