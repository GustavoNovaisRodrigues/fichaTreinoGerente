import { TestBed, async, inject } from '@angular/core/testing';

import { GerenteGuard } from './gerente.guard';

describe('GerenteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GerenteGuard]
    });
  });

  it('should ...', inject([GerenteGuard], (guard: GerenteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
