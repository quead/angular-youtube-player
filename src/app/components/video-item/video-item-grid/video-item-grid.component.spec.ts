import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoItemGridComponent } from './video-item-grid.component';

describe('VideoItemGridComponent', () => {
	let component: VideoItemGridComponent;
	let fixture: ComponentFixture<VideoItemGridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VideoItemGridComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VideoItemGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
