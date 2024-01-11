import { TestBed } from '@angular/core/testing';

import { LastfmService } from './places.service';

describe('LastfmService', () => {
  let service: LastfmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastfmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
