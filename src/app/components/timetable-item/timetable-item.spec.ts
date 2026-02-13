import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableItem } from './timetable-item';

describe('TimetableItem', () => {
  let component: TimetableItem;
  let fixture: ComponentFixture<TimetableItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
