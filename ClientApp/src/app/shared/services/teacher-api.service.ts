import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../core/base-api';
import { Curriculum, Group } from '../models';

@Injectable()
export class TeacherApiSerice extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  updateSchedule(id: number, curriculum: Curriculum): Observable<Curriculum> {
    return this.put(`Teacher/UpdateSchedule/${id}`, curriculum);
  }

  addSchedule(curriculum: Curriculum): Observable<Curriculum> {
    return this.post(`Teacher/AddSchedule`, curriculum);
  }

  getScheduleById(id: number): Observable<Curriculum[]> {
    console.log('getScheduleById', id);
    return this.get(`Teacher/GetScheduleById/${id}`);
  }

  deleteScheduleById(id: number): Observable<Curriculum> {
    return this.delete(`Teacher/DeleteSchedule/${id}`);
  }
}
