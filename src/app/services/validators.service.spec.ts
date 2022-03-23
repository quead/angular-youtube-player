import { TestBed } from '@angular/core/testing';

import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let service: ValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
