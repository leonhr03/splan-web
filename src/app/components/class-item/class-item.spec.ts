import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassItem } from './class-item';

describe('ClassItem', () => {
  let component: ClassItem;
  let fixture: ComponentFixture<ClassItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
