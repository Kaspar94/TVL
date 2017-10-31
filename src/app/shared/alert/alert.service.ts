import {Injectable} from "@angular/core";

declare const $: any;

@Injectable()
export class AlertService {

  constructor() {
  }

  success(msg, title?, icon?) {
    $.notify({
      title: title,
      message: msg,
      icon: icon ? icon : 'fa fa-check-circle fa-lg',
    }, {
      type: 'success'
    });
  }

  error(msg, title?, icon?) {
    $.notify({
      title: title,
      message: msg,
      icon: icon ? icon : 'fa fa-exclamation-triangle fa-lg',
    }, {
      type: 'danger'
    });
  }
}
