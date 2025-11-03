import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCountry } from './by-country';

describe('ByCountry', () => {
  let component: ByCountry;
  let fixture: ComponentFixture<ByCountry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByCountry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByCountry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
