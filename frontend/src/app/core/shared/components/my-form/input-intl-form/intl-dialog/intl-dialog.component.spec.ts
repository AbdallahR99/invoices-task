import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlDialogComponent } from './intl-dialog.component';

describe('IntlDialogComponent', () => {
  let component: IntlDialogComponent;
  let fixture: ComponentFixture<IntlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntlDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
