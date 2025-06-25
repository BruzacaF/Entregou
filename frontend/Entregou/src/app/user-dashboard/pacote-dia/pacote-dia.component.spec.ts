import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacoteDiaComponent } from './pacote-dia.component';

describe('PacoteDiaComponent', () => {
  let component: PacoteDiaComponent;
  let fixture: ComponentFixture<PacoteDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacoteDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacoteDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
