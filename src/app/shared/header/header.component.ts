import {Component, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import {SharedService} from "../shared.service";
import {LoginComponent} from "../login/login.component";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../alert/alert.service";

declare var $;
@Component({
  selector: 'header-shared',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.css', '../../app.component.css']
})
export class CustomerSideHeaderComponent implements AfterViewInit{

  @Input() title: string;
  modalOption: NgbModalOptions = {};

  constructor(private sharedService: SharedService,
              private modalService: NgbModal,
              public alertService: AlertService) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }


  ngAfterViewInit(): void {
    var canvas : any = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.moveTo(174,0);
    ctx.lineTo(70,80);
    ctx.lineTo(175,80);
    ctx.lineTo(175,0);
    ctx.strokeStyle ="#FFFFFF";
    ctx.stroke();
    ctx.fillStyle = "#FF6319";
    ctx.fill();
  }


  changeLang(lang: any) {
    this.sharedService.lang = lang;
  }

  logout() {
    this.sharedService.loggedIn = false;
  }

  openLogin() {
    const dialog = (<LoginComponent>this.modalService.open(LoginComponent, this.modalOption).componentInstance);
  }
}
