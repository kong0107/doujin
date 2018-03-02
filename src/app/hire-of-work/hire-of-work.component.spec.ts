import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireOfWorkComponent } from './hire-of-work.component';

describe('HireOfWorkComponent', () => {
  let component: HireOfWorkComponent;
  let fixture: ComponentFixture<HireOfWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireOfWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireOfWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
