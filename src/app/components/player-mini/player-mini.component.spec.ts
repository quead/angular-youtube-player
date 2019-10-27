import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMiniComponent } from './player-mini.component';

describe('PlayerMiniComponent', () => {
	let component: PlayerMiniComponent;
	let fixture: ComponentFixture<PlayerMiniComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlayerMiniComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayerMiniComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
