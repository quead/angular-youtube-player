import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeIframeComponent } from './youtube-iframe.component';

describe('YoutubeIframeComponent', () => {
  let component: YoutubeIframeComponent;
  let fixture: ComponentFixture<YoutubeIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
