import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: 'youtube-about.component.html'
})

export class AboutComponent implements OnInit {

  ngOnInit() {
    console.log('about');
  }

}
