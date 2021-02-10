
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../core/base-api';
import { Curriculum, Group } from '../models';

@Injectable()
export class GroupApiSerice extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllGroups(): Observable<Group[]>{
    return this.get('Group/GetAllGroups');
  }

  updateSchedule(id: number, curriculum: Curriculum): Observable<Curriculum> {
    return this.put(`Group/UpdateSchedule/${id}`, curriculum);
  }

  addSchedule(curriculum: Curriculum): Observable<Curriculum> {
    return this.post(`Group/AddSchedule`, curriculum);
  }

  getScheduleById(id: number): Observable<Curriculum[]> {
    return this.get(`Group/GetScheduleById/${id}`);
  }

  deleteScheduleById(id: number): Observable<Curriculum> {
    return this.delete(`Group/DeleteSchedule/${id}`);
  }
}
