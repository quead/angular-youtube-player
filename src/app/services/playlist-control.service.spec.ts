import { TestBed } from '@angular/core/testing';

import { PlaylistControlService } from './playlist-control.service';

describe('PlaylistControlService', () => {
  let service: PlaylistControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
