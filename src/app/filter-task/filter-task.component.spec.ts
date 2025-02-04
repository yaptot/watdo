import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTaskComponent } from './filter-task.component';

describe('FilterTaskComponent', () => {
  let component: FilterTaskComponent;
  let fixture: ComponentFixture<FilterTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
