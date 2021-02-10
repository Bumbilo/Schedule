import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { GroupScheduleComponent } from './group-schedule/group-schedule.component';
import { FacultyScheduleComponent } from './faculty-schedule/faculty-schedule.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SharedApiSerice } from './shared/services/shared-api.service';
import { FacultyApiSerice } from './shared/services/faculty-api.service';
import { GroupApiSerice } from './shared/services/group-api.service';
import { TeacherApiSerice } from './shared/services/teacher-api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ModalComponent,
    HomeComponent,
    GroupScheduleComponent,
    FacultyScheduleComponent,
    TeacherScheduleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'group-schedule', component: GroupScheduleComponent },
      { path: 'faculty-schedule', component: FacultyScheduleComponent },
      { path: 'teacher-schedule', component: TeacherScheduleComponent },
    ])
  ],
  providers: [SharedApiSerice, FacultyApiSerice, GroupApiSerice, TeacherApiSerice],
  bootstrap: [AppComponent]
})
export class AppModule { }
