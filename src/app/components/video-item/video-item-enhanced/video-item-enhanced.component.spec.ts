import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoItemEnhancedComponent } from './video-item-enhanced.component';

describe('VideoItemEnhancedComponent', () => {
  let component: VideoItemEnhancedComponent;
  let fixture: ComponentFixture<VideoItemEnhancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoItemEnhancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoItemEnhancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
