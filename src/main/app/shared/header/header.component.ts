import {Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'header-shared',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.css', '../shared.css']
})
export class CustomerSideHeaderComponent implements AfterViewInit{


  constructor() {

  }


  ngAfterViewInit(): void {
    var canvas : any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(175,100);
    ctx.lineTo(0,100);
    ctx.lineTo(0,0);
    ctx.strokeStyle ="#FFFFFF";
    ctx.stroke();
    ctx.fillStyle = "#F04E23";
    ctx.fill();
  }
}
