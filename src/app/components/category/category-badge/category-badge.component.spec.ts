import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBadgeComponent } from './category-badge.component';

describe('CategoryBadgeComponent', () => {
  let component: CategoryBadgeComponent;
  let fixture: ComponentFixture<CategoryBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
