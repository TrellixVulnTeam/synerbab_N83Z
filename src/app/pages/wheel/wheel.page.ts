import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.page.html',
  styleUrls: ['./wheel.page.scss'],
})
export class WheelPage implements OnInit {

  member: Array<any> = [];

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit(){
    if(this.router.getCurrentNavigation().extras.state) {
      let state = this.router.getCurrentNavigation().extras.state;
      //console.log('state : ', state.member);
      state.member.forEach(item=>{
        this.member.push([item.name,1]);
      });
      setTimeout(() => {
        this.shuffle();
        this.shuffle();
        this.shuffle();
      }, 500);
      setTimeout(() => {
        this.loadSpin();
      }, 1000);
    }
  }

  shuffle() {
    this.member.sort(() => Math.random() - 0.5);
  }

  goBack(){
    this.navCtrl.back();
    location.reload();
  }

  loadSpin(){
    Highcharts.setOptions({
      colors: ['#D3F898', '#BDC8F9', '#F694C1', '#EDE7B1', '#A9DEF9','#D3F898', '#BDC8F9', '#F694C1', '#EDE7B1', '#A9DEF9','#D3F898', '#BDC8F9', '#F694C1', '#EDE7B1', '#A9DEF9','#D3F898', '#BDC8F9', '#F694C1', '#EDE7B1', '#A9DEF9','#D3F898', '#BDC8F9', '#F694C1', '#EDE7B1', '#A9DEF9']
    });

    let chart;

      const button = document.getElementById('play');
      let t; // animation

      button.addEventListener('click', e => {
        if (t) {
          clearInterval(t);
        }
        //button.disabled = true;

        chart.setTitle( {
          text:  '두구두구 두구두구...'
        });

        // How many degrees to spin for each iteration
        let diff = 25 + Math.random() * 10,
          startAngle = chart.series[0].options.startAngle;

        const animationSpeed = 25;
        t = setInterval(() => { // Animation loop

          // Update angle and diff
          startAngle += diff;
          if (startAngle > 360) {
            startAngle -= 360;
          }
          diff *= 0.98;
          chart.series[0].update({ startAngle });

          // stop the wheel and get the winner
          if (diff < 0.01) {
            const winner = findWinner(chart.series[0].data);
            chart.setTitle({
              text:  '당첨자는 ' +
                chart.series[0].data[winner].name + '!'
            });
            clearInterval(t);
            //button.disabled = false;
          }
        }, animationSpeed);
      });

      // Create the chart
      let triangle;
      // @ts-ignore
      chart = Highcharts.chart('container', {
        chart: {
          animation: false,
          marginTop: 100,
          events: {
            resize: function () {
              triangle.destroy(); // Prevent arrow misplacement
              triangle = chart.renderer.path([
                ['M', chart.chartWidth / 2 - 10, chart.plotTop - 5],
                ['L', chart.chartWidth / 2 + 10, chart.plotTop - 5],
                ['L', chart.chartWidth / 2, chart.plotTop + 10],
                ['Z']
              ])
                .attr({
                  fill: 'black'
                })
                .add();
            }
          }
        },

        title: {
          text: '오늘은 아닐꺼야!'
        },
        series: [{
          type: 'pie',
          size: '100%',
          dataLabels: {
            distance: -20
          },
          data: this.member,
          startAngle: 360 * Math.random()
        }]

      });

      // Create the arrow at the top.
      triangle = chart.renderer.path([
        ['M', chart.chartWidth / 2 - 10, chart.plotTop - 5],
        ['L', chart.chartWidth / 2 + 10, chart.plotTop - 5],
        ['L', chart.chartWidth / 2, chart.plotTop + 10],
        ['Z']
      ])
        .attr({
          fill: 'black'
        })
        .add();


    const radToDeg = r => r * 180 / Math.PI;

    const findWinner = (data) => {
      const sliceSize = 360 / data.length;
      const winThreshold = 360 - sliceSize;
      let sliceBeginning; // This marks the beginning of a slice.

      for (let i in data) {
        sliceBeginning = radToDeg(data[i].shapeArgs.start) + 90;

        if (sliceBeginning > 360) {
          sliceBeginning -= 360;
        }

        if (sliceBeginning > winThreshold) {
          return i;
        }
      }
      return -1;
    }
  }



}
