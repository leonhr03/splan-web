import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeOverview } from './grade-overview';

describe('GradeOverview', () => {
  let component: GradeOverview;
  let fixture: ComponentFixture<GradeOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
