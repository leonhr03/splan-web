import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItem } from './date-item';

describe('DateItem', () => {
  let component: DateItem;
  let fixture: ComponentFixture<DateItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
