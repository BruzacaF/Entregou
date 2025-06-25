import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPacoteComponent } from './adicionar-pacote.component';

describe('AdicionarPacoteComponent', () => {
  let component: AdicionarPacoteComponent;
  let fixture: ComponentFixture<AdicionarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPacoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
