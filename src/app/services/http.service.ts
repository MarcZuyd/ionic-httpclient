import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

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

  configUrl = 'assets/config.json';
  url = 'assets/coinmarketcap.json';
  // tslint:disable-next-line:max-line-length
  liveUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=1,1027,52,1765,2,1831,825,1839,512,1958&CMC_PRO_API_KEY=3bcf4e2f-891b-4afe-8f7c-eed05516919f';

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getCMCtop10() {
    return this.http.get<Coinmarketcap>(this.url, this.httpOptions);
  }

  getConfigNative() {
    return this.nativeHttp.get(this.configUrl, {}, {});
  }
  getDataNative() {
    return this.nativeHttp.get(this.url, {}, {});

  }
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }
}
