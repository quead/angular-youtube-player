import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  defaults = {
    enabled: false,
    message: 'No message',
  };
  timer: any;

  // Playlist 0 - 10
  // Settings 10 - 20
  // Others 20 - 30
  copies: any = {
    0: 'Playlist is empty.',
    1: 'Downloading the playlist from the cloud...',
    2: 'Updating your playlist on the cloud...',
    3: 'Added to the playlist',
    4: 'The Video is already in the playlist.',
    5: 'The playlist from the cloud was updated.',
    6: 'The playlist from the cloud cannot be updated.',
    7: 'Downloaded playlist from the cloud.',
    8: 'The room does not exist so you could not get any info.',
    10: 'Please check external settings.',
    20: 'Copied',
    21: 'Changed',
    22: 'Settings has been saved',
    23: 'Video Removed from the playlist',
    30: 'Someone joined in your room.',
    31: 'Someone left your room.',
    32: 'You joined in the room.',
    33: 'You left the room.',
    34: 'Room changed.',
    35: 'The chosen name is used.',
    36: 'You left the name empty.',
    37: 'The name has been changed.',
    38: 'The name is empty or is used.',
  };

  constructor() {}

  triggerNotify(messageCode: number) {
    this.defaults.enabled = true;
    this.defaults.message = this.copies[messageCode];
    clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.defaults.enabled = false), 3000);
  }
}
