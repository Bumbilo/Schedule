import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { Day, Subject, TimeTable, Activity, Teacher, Audience } from './shared/models';
import { SharedApiSerice } from './shared/services/shared-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  sharedDataSubscription: Subscription; 
  
  constructor(private sharedApiSerice: SharedApiSerice) {}

  ngOnInit() {
    this.getAllSharedData();
  }

  public getAllSharedData(): void {
   this.sharedDataSubscription = combineLatest(
      this.sharedApiSerice.getAllDays(), 
      this.sharedApiSerice.getAllTimes(),
      this.sharedApiSerice.getAllSubjects(),
      this.sharedApiSerice.getAllTeachers(),
      this.sharedApiSerice.getAllAudiences(),
      this.sharedApiSerice.getAllActivities(),
      this.sharedApiSerice.getAllFaculties(),
    ).subscribe(([days, timeTables, subjects, teachers, audiences, activitys, fuclties]) => {
      localStorage.setItem('audiences', JSON.stringify(audiences));
      localStorage.setItem('activities', JSON.stringify(activitys));
      localStorage.setItem('subjects', JSON.stringify(subjects));
      localStorage.setItem('teachers', JSON.stringify(teachers));
      localStorage.setItem('times', JSON.stringify(timeTables));
      localStorage.setItem('days', JSON.stringify(days));
      localStorage.setItem('faculties', JSON.stringify(fuclties));
    });
  }

  ngOnDestroy() {
    if(this.sharedDataSubscription) {
      this.sharedDataSubscription.unsubscribe();
    }
  }
}
