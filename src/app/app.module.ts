import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {StateService} from './services/state.service';
import {RouterModule, Routes} from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ResultsComponent } from './results/results.component';
import { LivesComponent } from './lives/lives.component';
import { GameOverComponent } from './game-over/game-over.component';
import { TimerComponent } from './timer/timer.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'results', component: ResultsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TasksComponent,
    ResultsComponent,
    LivesComponent,
    GameOverComponent,
    TimerComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
