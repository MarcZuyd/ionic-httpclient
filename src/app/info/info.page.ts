import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketDataService } from '../services/market-data.service';
import { Config, CoinConfig } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { ActivatedRoute } from '@angular/router';
import { Historical } from '../interfaces/historical';
import { HttpService } from '../services/http.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  currentCoin: number;
  coinPosition: number;
  symbol: string;
  config: Config;
  top10: Coinmarketcap;
  historicalData: Historical;
  showPage = false;

  constructor(
    private data: MarketDataService,
    private route: ActivatedRoute,
    private http: HttpService,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    console.log('INIT INFO PAGE');
    this.top10 = this.data.top10;
    this.config = this.data.config;
    this.currentCoin = this.getCoin();
    this.getSymbol();
    this.coinPosition = this.data.cmcTop10Id.indexOf(this.currentCoin);
    this.getHistoricalDataNative(this.symbol, 31);
  }

  getCoin(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }

  getSymbol() {
    for (const coin of this.top10.data) {
      if (coin.id === this.currentCoin) {
        this.symbol = coin.symbol;
        console.log('symbol: ' + this.symbol);
        break;
      }
    }
  }

  getPricesFromHistoricalData(): number[] {
    const list = [];
    console.log('FILL PRICES LIST');
    for (const data of this.historicalData.Data) {
      list.push(data.close);
      // console.log(data.close);
    }
    return list;
  }

  getHistoricalData() {
    this.http.getHistoricalData()
      .subscribe((response: Historical) =>
        this.historicalData = response,
        (err) => console.log(err),
        () => {
          this.data.prices = this.getPricesFromHistoricalData();
          this.getSymbol();
          this.showPage = true;
        }
      );
  }

  // Native Android Http
  getHistoricalDataNative(ticker: string, days: number) {
    this.http.getHistoricalDataNative(ticker, days)
    .then(response => {
      console.log('Native data');
      this.historicalData = JSON.parse(response.data);
      console.log(response.data);
      this.data.prices = this.getPricesFromHistoricalData();
      this.showPage = true;
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
