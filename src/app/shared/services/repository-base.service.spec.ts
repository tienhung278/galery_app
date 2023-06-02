import { TestBed } from '@angular/core/testing';

import { RepositoryBaseService } from './repository-base.service';

describe('RepositoryBaseService', () => {
  let service: RepositoryBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositoryBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
