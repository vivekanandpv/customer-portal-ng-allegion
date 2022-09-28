import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAggregationComponent } from './account-aggregation.component';

describe('AccountAggregationComponent', () => {
  let component: AccountAggregationComponent;
  let fixture: ComponentFixture<AccountAggregationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAggregationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAggregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
