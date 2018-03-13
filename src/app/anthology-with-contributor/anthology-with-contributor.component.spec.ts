import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthologyWithContributorComponent } from './anthology-with-contributor.component';

describe('AnthologyWithContributorComponent', () => {
  let component: AnthologyWithContributorComponent;
  let fixture: ComponentFixture<AnthologyWithContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnthologyWithContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnthologyWithContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
