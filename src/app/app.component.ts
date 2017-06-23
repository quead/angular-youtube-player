import { Component } from '@angular/core';

@Component({
  selector: 'app-yt',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  event: any = '';

  getStates(event) {
    this.event = event;
  }
}
