import { TestBed, inject } from '@angular/core/testing';

import { DbCrudService } from './db-crud.service';

describe('DbCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbCrudService]
    });
  });

  it('should be created', inject([DbCrudService], (service: DbCrudService) => {
    expect(service).toBeTruthy();
  }));
});
