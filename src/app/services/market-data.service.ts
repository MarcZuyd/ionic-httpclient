import { Injectable } from '@angular/core';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  config: Config;
  top10: Coinmarketcap;

  cmcTop10Id = [];

  constructor() { }
}
