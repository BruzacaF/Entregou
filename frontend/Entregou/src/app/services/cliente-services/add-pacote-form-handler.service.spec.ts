import { TestBed } from '@angular/core/testing';

import { AddPacoteFormHandlerService } from './add-pacote-form-handler.service';

describe('AddPacoteFormHandlerService', () => {
  let service: AddPacoteFormHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPacoteFormHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
