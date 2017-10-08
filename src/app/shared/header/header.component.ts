import {Component, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import {SharedService} from "../shared.service";

declare var $;
@Component({
  selector: 'header-shared',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.css', '../../app.component.css']
})
export class CustomerSideHeaderComponent implements AfterViewInit{

  @Input() title: string;

  username: any;
  password: any;

  constructor(private sharedService: SharedService) {

  }


  ngAfterViewInit(): void {
    var canvas : any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(174,0);
    ctx.lineTo(70,100);
    ctx.lineTo(175,100);
    ctx.lineTo(175,0);
    ctx.strokeStyle ="#FFFFFF";
    ctx.stroke();
    ctx.fillStyle = "#F04E23";
    ctx.fill();
  }

  validateLogin() {
    if (this.username === 'admin' && this.password === 'admin' && !this.sharedService.loggedIn) {
        this.sharedService.loggedIn = !this.sharedService.loggedIn;
        this.sharedService.title = 'header.adminTitle';
        $('#loginModal').modal('hide');
  }
  }

  changeLang(lang: any) {
    this.sharedService.lang = lang;
  }
}
