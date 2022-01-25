import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIntlFormComponent } from './input-intl-form.component';

describe('InputIntlFormComponent', () => {
  let component: InputIntlFormComponent;
  let fixture: ComponentFixture<InputIntlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIntlFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIntlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
