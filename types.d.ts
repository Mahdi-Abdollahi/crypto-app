export interface Currency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  last_updated?: string;
}

export interface Query {
  page?: string;
  vs_currency?: string;
}

export interface Button {
  handler: () => void;
  text: string;
  isDisabled: boolean;
  classes?: string;
}
