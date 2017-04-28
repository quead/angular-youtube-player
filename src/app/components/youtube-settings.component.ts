import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-settings',
  templateUrl: 'youtube-settings.component.html'
})

export class SettingsComponent {

    menuOpened: boolean = false;

    constructor() {}

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

}