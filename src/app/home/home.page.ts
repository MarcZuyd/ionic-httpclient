import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Config } from '../interfaces/config';
import { Coinmarketcap } from '../interfaces/coinmarketcap';
import { Platform, LoadingController } from '@ionic/angular';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  config: Config;
  top10: Coinmarketcap;
  headers: string[];

  cmcTop10Id = [];

  showListById = false;
  showTop10 = true;

  constructor(private http: HttpService, private platform: Platform, public loadingController: LoadingController) {}

  ngOnInit() {
   // this.showCMClist();
   // this.showConfig();
    this.platform.ready().then(() => {
      this.getData();
    });
    console.log('init page');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getData();
    event.target.complete();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present().then(() => {
      this.getData();
      loading.dismiss();
    });
    console.log('Loading dismissed!');
  }

  // Native Android Http
  getConfig() {
    this.http.getConfigNative(this.cmcTop10Id)
    .then(response => {
      console.log('Native config');
      this.config = JSON.parse(response.data);
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

  // Native Android Http
  getData() {
    this.http.getDataNative()
    .then(response => {
      console.log('Native data');
      this.top10 = JSON.parse(response.data);
      this.setCoinIds();
      this.getConfig();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }

  showConfig() {
    this.http.getConfig()
      .subscribe((response: Config) =>
        this.config = {
          status: response['status'],
          data:  response['data']
        },
        (err) => console.log(err),
        () => console.log());
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
      });
  }

  setCoinIds() {
    this.cmcTop10Id = [];
    for (const data of this.top10.data) {
      // console.log(data.name + ' ' + data.id);
      this.cmcTop10Id.push(data.id);
      // console.log(this.cmcTop10Id);
    }
  }

  buttonClick() {
    this.getConfig();
    this.getData();
  }
}



