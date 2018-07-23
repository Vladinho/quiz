import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesComponent } from './lives.component';
import {StateService} from "../services/state.service";

describe('LivesComponent', () => {
  let component: LivesComponent;
  let fixture: ComponentFixture<LivesComponent>;
  let stateService: StateService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesComponent ],
      providers: [StateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesComponent);
    component = fixture.componentInstance;
    stateService = fixture.debugElement.injector.get(StateService);
    spy = spy(StateService);
    fixture.detectChanges();
  });

  it('should call service', () => {

  });

  it('should set the right value', () => {
  });
});
