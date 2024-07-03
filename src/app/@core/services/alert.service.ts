import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  errorAlert(title: string, text: string, timer?: number, enableHtml?: boolean) {
    this.toastr.error(text, title, {
      timeOut: timer || 3000,
      enableHtml: enableHtml ?? false
    })
  }
}
