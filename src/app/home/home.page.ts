import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Config } from '../interfaces/config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  config: Config;
  headers: string[];
  response = false;

  cmcPositions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.showConfig();
    // this.showConfigResponse();
  }

  showConfig() {
    this.http.getConfig()
      .subscribe((response: Config) => this.config = {
          status: response['status'],
          data:  response['data']
      });
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


  buttonClick() {
    console.log(this.config.data[1].name);

  }
}



