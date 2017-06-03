import { Component } from '@angular/core';

@Component({
  selector: 'yt-app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  event:any = '';

  getStates(event) {
    this.event = event;
  }
}
