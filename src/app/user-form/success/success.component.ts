import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css','../user-form.css', '../../app.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
  }

  returnAgain() {
    this.sharedService.successfullyReturned = !this.sharedService.successfullyReturned;
  }


}
