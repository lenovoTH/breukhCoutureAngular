import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liste2Component } from './liste2.component';

describe('Liste2Component', () => {
  let component: Liste2Component;
  let fixture: ComponentFixture<Liste2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Liste2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Liste2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
