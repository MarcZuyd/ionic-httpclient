import { Injectable } from '@angular/core';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { Historical } from '../interfaces/historical';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  config: Config;
  top10: Coinmarketcap;

  cmcTop10Id: number[];
  prices: number[];
  ticker: string;

  historicalData: Historical;

  constructor() { }
}
