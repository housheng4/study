import { TestBed } from '@angular/core/testing';

import { AdressServiceService } from './adress-service.service';

describe('AdressServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdressServiceService = TestBed.get(AdressServiceService);
    expect(service).toBeTruthy();
  });
});
