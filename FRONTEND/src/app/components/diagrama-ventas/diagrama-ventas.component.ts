import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-diagrama-ventas',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './diagrama-ventas.component.html',
  styleUrl: './diagrama-ventas.component.css'
})
export class DiagramaVentasComponent {
  options!: EChartsOption;
  updateOptions!: EChartsOption;

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data!: DataT[];
  private timer: any;

  constructor() {}

  ngOnInit(): void {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(2024, 4, 20);
    this.value = Math.random() * 100;

    for (let i = 0; i < 100; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          const date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Mocking Data',
          type: 'line',
          showSymbol: false,
          data: this.data,
        },
      ],
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [
          {
            data: this.data,
          },
        ],
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData(): DataT {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value),
      ],
    };
  }
}

type DataT = {
  name: string;
  value: [string, number];
}

