import { TestBed } from '@angular/core/testing';

import { YoutubeIframeService } from './youtube-iframe.service';

describe('YoutubeIframeService', () => {
  let service: YoutubeIframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeIframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
