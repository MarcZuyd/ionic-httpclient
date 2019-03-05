import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  config: Config;
  top10: Coinmarketcap;
  headers: string[];
  response = false;

  cmcPositions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

  cmcTop10Id = [];

  showListById = false;
  showTop10 = true;

  constructor(private http: HttpService) {}

  ngOnInit() {
    // this.showConfig();
    // this.showCMClist();
    this.getConfig();
    this.getData();

    console.log('init page');
  }

  getConfig() {
    this.http.getConfigNative()
    .then(response => {
      console.log('Native config');
      this.config = JSON.parse(response.data);
      console.log(this.config);
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }
  getData() {
    this.http.getDataNative()
    .then(response => {
      console.log('Native data');
      this.top10 = JSON.parse(response.data);
      console.log(this.top10);
      this.setCoinIds();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

  toggleList() {

  }

  showConfig() {
    this.http.getConfig()
      .subscribe((response: Config) =>
        this.config = {
          status: response['status'],
          data:  response['data']
        });
  }

  showCMClist() {
    const req = this.http.getCMCtop10();
    req.subscribe(
      (response: Coinmarketcap) => this.top10 = {
        status: response['status'],
        data:  response['data'],
      },
      (err) => console.log(err),
      () => this.setCoinIds());
  }

  showConfigResponse() {
    this.http.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
        this.response = true;
      });
  }

  setCoinIds() {
    this.cmcTop10Id = [];
    for (const data of this.top10.data) {
      console.log(data);
      this.cmcTop10Id.push(data.id);
    }
  }

  buttonClick() {
  }
}



