import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../core/base-api';
import { Day, Subject, TimeTable, Activity, Teacher, Audience, Faculty } from '../models';

@Injectable()
export class SharedApiSerice extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllDays(): Observable<Day[]> {
    return this.get('Shared/GetAllDays');
  }

  getAllSubjects(): Observable<Subject[]> {
    return this.get('Shared/GetAllSubjects');
  }

  getAllTimes(): Observable<TimeTable[]> {
    return this.get('Shared/GetAllTimes');
  }

  getAllActivities(): Observable<Activity[]> {
    return this.get('Shared/GetAllActivities');
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.get('Shared/GetAllTeachers');
  }

  getAllAudiences(): Observable<Audience[]> {
    return this.get('Shared/GetAllAudiences');
  }

  getAllFaculties(): Observable<Faculty[]> {
    return this.get('Shared/GetAllFaculties');
  }
}
