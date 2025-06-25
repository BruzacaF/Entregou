import { TestBed } from '@angular/core/testing';

import { AddPacoteService } from './pacote.service';

describe('AddPacoteService', () => {
  let service: AddPacoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPacoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
