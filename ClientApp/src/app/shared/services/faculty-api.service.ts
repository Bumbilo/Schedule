import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../core/base-api';
import { Curriculum } from '../models';

@Injectable()
export class FacultyApiSerice extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  updateSchedule(id: number, curriculum: Curriculum): Observable<Curriculum> {
    return this.put(`Faculty/UpdateSchedule/${id}`, curriculum);
  }

  addSchedule(curriculum: Curriculum): Observable<Curriculum> {
    console.log(curriculum);
    return this.post(`Faculty/AddSchedule`, curriculum);
  }

  getScheduleById(id: number): Observable<Curriculum[]> {
    return this.get(`Faculty/GetScheduleById/${id}`);
  }

  deleteScheduleById(id: number): Observable<Curriculum> {
    return this.delete(`Faculty/DeleteSchedule/${id}`);
  }
}
