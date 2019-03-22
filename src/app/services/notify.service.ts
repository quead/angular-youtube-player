import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

    defaults = {
        enabled: false,
        message: 'No message'
    };

    constructor() { }

    triggerNotify(message: string) {
        this.defaults.enabled = true;
        this.defaults.message = message;
        setTimeout(() => this.defaults.enabled = false, 3000);
    }
}
