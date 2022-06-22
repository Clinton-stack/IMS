import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import {Config, Data, Layout} from 'plotly.js';

import * as _ from "lodash";
declare const Plotly;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  title: string = "My first AGM project";
  lat: number = 51.678418;
  lng: number = 7.809007;
  data: any;
  data2: any;
  options: any;
  @ViewChild("chart") el: ElementRef;

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

  constructor() {
    this.data = {
      labels: ["MAC PC", "HP PC", "TABs"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FFFD82", "#ED217C", "#2D3047"]
        }
      ]
    };

    this.data2 = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Abuja Sales",
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Taraba Sales",
          backgroundColor: "#9CCC65",
          borderColor: "#7CB342",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  // basicChart() {
  //   const element = this.el.nativeElement

  //   const data = [{
  //     x: [1, 2, 3, 4, 5],
  //     y: [1, 2, 4, 8, 16],

  //   }]

  //   const style = {
  //     margin: { t: 0 },

  //   }

  //   Plotly.plot( element, data, style )
  // }

  //  data = [{
  //   values: [19, 26, 55],
  //   labels: ['Residential', 'Non-Residential', 'Utility'],
  //   type: 'pie'
  // }];

  // Plotly.newPlot('myDiv', data, {}, {showSendToCloud:true});
}
