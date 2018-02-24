import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

function _window(): any {
  return window;
}

@Injectable()
export class NwjsService {
  mw: any;
  up: any;

  constructor() {
    this.mw = _window().mw;
    this.up = _window();
  }

  init(): Observable<any> {
    return new Observable(observer => {
        if (this.mw) {
            observer.next(this.mw);
            return observer.complete();
        } else {
          if (typeof this.mw === 'undefined') {
            this.mw = _window().nw;
            observer.next(this.mw);
            observer.complete();
          }
        }
    });
  }
}
