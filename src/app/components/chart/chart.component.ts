import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart: any;

  priceData: number[];
  labels: string[];
  constructor(private data: MarketDataService) { }


  ngOnInit() {
    this.priceData = this.data.prices;
    console.log('FILLING CHART WITH DATA');
    console.log(this.priceData);
    this.labels = this.setLabels();
    this.drawChart();
  }

  setLabels(): string[] {
    const list = [];
    for (let i = 0; i < this.priceData.length; i++) {
      list.push('');
    }
    return list;
  }

  drawChart() {
    this.lineChart = new Chart(this.lineChart.nativeElement, {

      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
              ticks: {
                beginAtZero: false,
                fontColor: '#668791'
              },
              gridLines: {
                display: false
              }
          }],
          xAxes: [{
            ticks: {
                beginAtZero: false
            },
            gridLines: {
              display: false
            }
          }]
        }
      },
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Price',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#ffffff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ffffff)',
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.priceData,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
