import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {StateService} from './services/state.service';
import {RouterModule, Routes} from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: 'tasks', component: TasksComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
