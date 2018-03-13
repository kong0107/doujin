import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthologyWithoutContributorComponent } from './anthology-without-contributor.component';

describe('AnthologyWithoutContributorComponent', () => {
  let component: AnthologyWithoutContributorComponent;
  let fixture: ComponentFixture<AnthologyWithoutContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthologyWithoutContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthologyWithoutContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
