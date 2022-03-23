import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoItemListComponent } from './video-item-list.component';

describe('VideoItemListComponent', () => {
  let component: VideoItemListComponent;
  let fixture: ComponentFixture<VideoItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
