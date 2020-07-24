import { Injectable } from '@angular/core';
import { Alert } from 'src/app/shared/interfaces';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  danger(text: string) {
    this.alert$.next({ type: 'danger', text });
  }

  success(text: string) {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text });
  }
}
