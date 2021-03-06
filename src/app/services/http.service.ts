import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Historical } from '../interfaces/historical';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    })
  };

  constructor(private http: HttpClient, private nativeHttp: HTTP) { }

  cmcApiKey = '&CMC_PRO_API_KEY=3bcf4e2f-891b-4afe-8f7c-eed05516919f';
  cmcBaseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/';

  ccBaseUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=';

  configUrl = 'assets/config.json';
  url = 'assets/coinmarketcap.json';
  marketDataUrl = 'assets/historical.json';

  liveConfigUrl = this.cmcBaseUrl + 'info?id=1,1027,52,1765,2,1831,825,1839,512,1958' + this.cmcApiKey;

  liveUrl = this.cmcBaseUrl + 'listings/latest?sort=market_cap&start=1&limit=50&cryptocurrency_type=all&convert=EUR' + this.cmcApiKey;

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getCMCtop10() {
    return this.http.get<Coinmarketcap>(this.url, this.httpOptions);
  }

  getHistoricalData() {
    return this.http.get<Historical>(this.marketDataUrl);
  }

  getHistoricalDataNative(ticker: string, days: number) {
    const request = this.ccBaseUrl + ticker + '&tsym=EUR&limit=' + days.toString();
    console.log('REQUEST: ' + request);
    return this.nativeHttp.get(request, {}, {});
  }


  getConfigNative(list: number[]) {
    let subQuery = 'info?id=';
    for (const id of list) {
      subQuery += id.toString() + ',';
    }
    subQuery = subQuery.substring(0, subQuery.length - 1);
    console.log('SUBQUERY: ' + subQuery);
    const request = this.cmcBaseUrl + subQuery + this.cmcApiKey;
    console.log('REQUEST: ' + request);
    return this.nativeHttp.get(request, {}, {});
  }

  getDataNative() {
    console.log('REQUEST DATA NATIVE: ' + this.liveUrl);
    return this.nativeHttp.get(this.liveUrl, {}, {});

  }
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }
}
