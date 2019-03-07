import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../services/market-data.service';
import { Config, CoinConfig } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  currentCoin: number;
  coinPosition: number;

  config: Config;
  top10: Coinmarketcap;

  constructor(private data: MarketDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.top10 = this.data.top10;
    this.config = this.data.config;
    this.currentCoin = this.getCoin();
    this.coinPosition = this.data.cmcTop10Id.indexOf(this.currentCoin);
    console.log(this.data.cmcTop10Id);
  }

  getCoin(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
}
}
