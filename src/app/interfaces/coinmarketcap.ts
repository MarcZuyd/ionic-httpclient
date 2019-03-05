export interface Coinmarketcap {
    status: {
        timestamp: string;
        error_code: number;
        error_message: null;
        elapsed: number;
        credit_count: number;
      };
      data: Data[];
}

export interface Platform {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
}

export interface EUR {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    market_cap: number;
    last_updated: Date;
}

export interface Data {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    circulating_supply: number;
    total_supply: number;
    max_supply?: number;
    date_added: Date;
    num_market_pairs: number;
    tags: string[];
    platform: Platform;
    cmc_rank: number;
    last_updated: Date;
    quote: {
        EUR: {
            price: number;
            volume_24h: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            market_cap: number;
            last_updated: Date;
        }
    };
}
