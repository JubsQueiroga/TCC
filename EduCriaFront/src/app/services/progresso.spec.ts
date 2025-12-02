import { TestBed } from '@angular/core/testing';

import { Progresso } from './progresso';

describe('Progresso', () => {
  let service: Progresso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Progresso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
