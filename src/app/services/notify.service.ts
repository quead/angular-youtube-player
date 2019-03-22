import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

    defaults = {
        enabled: false,
        message: 'No message'
    };

    // Playlist 0 - 10
    // Settings 10 - 20
    // Others 20 - 30
    copies = {
        0: 'Playlist is empty.',
        1: 'Downloading the playlist from the cloud...',
        2: 'Updating your playlist on the cloud...',
        3: 'Added to the playlist',
        4: 'The Video is already in the playlist.',
        5: 'The playlist from the cloud was updated.',
        6: 'The playlist from the cloud cannot be updated.',
        7: 'Playlist from the cloud was downloaded.',
        10: 'Please check external settings.',
        20: 'Copied',
        21: 'Changed',
        22: 'Settings has been saved',
        23: 'Video Removed from the playlist'
        
    }

    constructor() { }

    triggerNotify(messageCode: number) {
        this.defaults.enabled = true;
        this.defaults.message = this.copies[messageCode];
        setTimeout(() => this.defaults.enabled = false, 3000);
    }
}
