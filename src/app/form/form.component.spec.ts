import {async, ComponentFixture, fakeAsync, flush, inject, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {StateService} from '../services/state.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalWindowComponent} from '../modal-window/modal-window.component';
import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from '../results/results.component';
import {TasksComponent} from '../tasks/tasks.component';
import {LivesComponent} from '../lives/lives.component';
import {TimerComponent} from '../timer/timer.component';
import {GameOverComponent} from '../game-over/game-over.component';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'results', component: ResultsComponent},
];

describe('FormComponent', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let stateService: StateService;
  let startLoadingSpy: jasmine.Spy;
  let url: string = 'https://opentdb.com/api.php?amount=10';
  // let stopLoadingSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterModule.forRoot(routes), FormsModule],
      declarations: [FormComponent, ModalWindowComponent, TasksComponent, ResultsComponent, LivesComponent, TimerComponent, GameOverComponent],
      providers: [StateService, {provide: APP_BASE_HREF, useValue: '/'}]
    })
      .compileComponents();

    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    stateService = fixture.debugElement.injector.get(StateService);
    startLoadingSpy = spyOn(stateService, 'startLoading');
    // stopLoadingSpy = spyOn(stateService, 'startLoading');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call StartLoading of service', () => {
    component.onSubmit();
    expect(startLoadingSpy.calls.any()).toBe(true);
  });

  it('property background of service should be false', () => {
    component.onSubmit();
    expect(stateService.background).toBe(false);
  });

  it('property url of service should be set', () => {
    component.onSubmit();
    expect(component.url).toBe(url);
  });

  it('should stop loading on success', () => {
    spyOn(stateService, 'stopLoading');

    component.onSubmit();

    const apiRequest = httpTestingController.expectOne('https://opentdb.com/api.php?amount=10');
    const apiRequestResponse = {
      'response_code': 0,
      'results': [{
        'category': 'General Knowledge',
        'type': 'multiple',
        'difficulty': 'easy',
        'question': 'What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?',
        'correct_answer': 'Demolition',
        'incorrect_answers': ['The Dream Team', 'The Bushwhackers', 'The British Bulldogs']
      }, {
        'category': 'General Knowledge',
        'type': 'boolean',
        'difficulty': 'easy',
        'question': 'The Great Wall of China is visible from the moon.',
        'correct_answer': 'False',
        'incorrect_answers': ['True']
      }, {
        'category': 'Art',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'What nationality was the surrealist painter Salvador Dali?',
        'correct_answer': 'Spanish',
        'incorrect_answers': ['Italian', 'French', 'Portuguese']
      }, {
        'category': 'History',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'In what year was the last natural case of smallpox documented?',
        'correct_answer': '1977',
        'incorrect_answers': ['1982', '1980', '1990']
      }, {
        'category': 'Entertainment: Video Games',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'In Touhou: Embodiment of Scarlet Devil, what song plays during Flandre Scarlet&#039;s boss fight?',
        'correct_answer': 'U.N. Owen Was Her',
        'incorrect_answers': ['Septette for the Dead Princess', 'Flowering Night', 'Pierrot of the Star-Spangled Banner']
      }, {
        'category': 'Entertainment: Japanese Anime & Manga',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'In the anime Assassination Classroom what is the class that Korosensei teaches?',
        'correct_answer': 'Class 3-E',
        'incorrect_answers': ['Class 3-A', 'Class 3-B', 'Class 3-D']
      }, {
        'category': 'History',
        'type': 'multiple',
        'difficulty': 'hard',
        'question': 'The Hagia Sophia was commissioned by which emperor of the Byzantine Empire?',
        'correct_answer': 'Justinian I',
        'incorrect_answers': ['Constantine IV', 'Arcadius', 'Theodosius the Great']
      }, {
        'category': 'Entertainment: Japanese Anime & Manga',
        'type': 'multiple',
        'difficulty': 'easy',
        'question': 'What caused the titular mascot of Yo-Kai Watch, Jibanyan, to become a yokai?',
        'correct_answer': 'Being run over by a truck',
        'incorrect_answers': ['Ate one too many chocobars', 'Through a magical ritual', 'When he put on the harmaki']
      }, {
        'category': 'Entertainment: Film',
        'type': 'multiple',
        'difficulty': 'medium',
        'question': 'Who is the director of the 1991 film &quot;Silence of the Lambs&quot;?',
        'correct_answer': 'Jonathan Demme',
        'incorrect_answers': ['Stanley Kubrick', 'Frank Darabont', 'Michael Bay']
      }, {
        'category': 'Science: Computers',
        'type': 'boolean',
        'difficulty': 'medium',
        'question': 'Linus Sebastian is the creator of the Linux kernel, which went on to be used in Linux, Android, and Chrome OS.',
        'correct_answer': 'False',
        'incorrect_answers': ['True']
      }]
    };
    apiRequest.flush(apiRequestResponse);

    expect(stateService.stopLoading).toHaveBeenCalled();
  });

  it('should stop loading on error', () => {
    spyOn(stateService, 'stopLoading');

    component.onSubmit();

    const apiRequest = httpTestingController.expectOne('https://opentdb.com/api.php?amount=10');
    apiRequest.flush(null, {status: 500, statusText: 'Internal Server Error'});

    expect(stateService.stopLoading).toHaveBeenCalled();
  });
});
