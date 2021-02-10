import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { ModalComponent } from '../shared/components/modal/modal.component';
import { Day, Subject, TimeTable, Activity, Teacher, Audience, Curriculum, Faculty } from '../shared/models';
import { FacultyApiSerice } from '../shared/services/faculty-api.service';

@Component({
  selector: 'faculty-schedule',
  templateUrl: './faculty-schedule.component.html'
})

export class FacultyScheduleComponent implements OnInit {
  constructor(
    private facultyApiSerice: FacultyApiSerice,
    private formBuilder: FormBuilder
  ) {
  }

  @ViewChild('facultySheduleModal', { static: false }) facultySheduleModal: ModalComponent;

  scheduleForm: FormGroup;

  public selectedCurriculum: Curriculum = new Curriculum();
  public selectedFaculty: Faculty = new Faculty();
  public groupSchedules: Array<any> = [];
  private groupsMap: object = {}
  public activities: Activity[];
  public audiences: Audience[];
  public subjects: Subject[];
  public teachers: Teacher[];
  public times: TimeTable[];
  public faculties: Faculty[];
  public days: Day[];


  ngOnInit() {
    this.initSharedData();
    this.createForm()
  }

  public createForm() {
    this.scheduleForm = this.formBuilder.group({
      day: ['', Validators.required],
      timeTable: ['', Validators.required],
      subject: ['', Validators.required],
      activity: ['', Validators.required],
      teacher: ['', Validators.required],
      audience: ['', Validators.required],
      capacity: ['', Validators.required],
      pairOfWeek: ['', Validators.required],
      duration: ['', Validators.required]
    })
  }

  public getData(id: number): void {
    this.facultyApiSerice.getScheduleById(id)
      .pipe(
        map((curriculum: Curriculum[]) => {
          curriculum.forEach(dataItem => this.groupsMap[dataItem.group.name] = dataItem.group.name);
          return curriculum;
        }),
        map(curriculum => Object.keys(this.groupsMap).map(group => curriculum.filter(dataItem => dataItem.group.name === group))))
      .subscribe(result => {
        result.map(groupShedule => {
          const noPariWeekLessons = groupShedule.filter(shed => !shed.pairOfWeek);
          const pariWeekLessons = groupShedule.filter(shed => shed.pairOfWeek);
          const scheduleWeek = this.prepearScheduleWeek(noPariWeekLessons);
          const scheduleWeekPair = this.prepearScheduleWeek(pariWeekLessons);
          this.groupSchedules.push({ group: [scheduleWeek, scheduleWeekPair] });
        })
      });
  }

  public initSharedData(): void {
    Object.keys(localStorage).forEach(sharedDataItem => this[sharedDataItem] = JSON.parse(localStorage[sharedDataItem]));
  }

  public deleteSchedule({ curriculumId }): void {
    this.facultyApiSerice.deleteScheduleById(curriculumId)
      .subscribe(() => {
        this.groupSchedules = [];
        this.getData(this.selectedFaculty.id)
      })
  }

  public addSchedule(lesson): void {
    this.selectedCurriculum = new Curriculum();
    this.selectedCurriculum.group = lesson.group;
    this.selectedCurriculum.faculty = lesson.group.faculty;
    this.facultySheduleModal.showWindow();
  }

  public editSchedule(sheduleItem): void {
    this.selectedCurriculum = sheduleItem;
    this.facultySheduleModal.showWindow();
  }

  public saveCurriculum(): void {
    if (!this.scheduleForm.invalid) {
      this.selectedCurriculum.curriculumId ? this.saveEditedCurriculum() : this.saveAddedCurriculum();
    }
  }

  public saveAddedCurriculum(): void {
    this.facultyApiSerice.addSchedule(this.selectedCurriculum).subscribe(curriculum => {
      this.groupSchedules = [];
      this.getData(this.selectedFaculty.id)
      this.selectedCurriculum = new Curriculum();
      this.scheduleForm.reset();
    });
  }

  public selectFaculty({ value }): void {
    this.groupSchedules = [];
    this.groupsMap = {};
    this.selectedFaculty = new Faculty();
    this.selectedFaculty = { ...this.faculties.find((faculty: Faculty) => faculty.id === Number(value)) };
    this.getData(this.selectedFaculty.id)
  }

  public saveEditedCurriculum(): void {
    this.facultyApiSerice.updateSchedule(this.selectedCurriculum.curriculumId, this.selectedCurriculum)
      .subscribe((curriculum: Curriculum) => {
        this.groupSchedules = [];
        this.getData(this.selectedFaculty.id)
        this.selectedCurriculum = new Curriculum();
        this.scheduleForm.reset();
      });
  }


  public changeForm({ name, value }) {
    if (this.selectedCurriculum[name].id) {
      this.selectedCurriculum[name].id = Number(value);
    } else {
      this.selectedCurriculum[name] = Number(value);
    }
  }


  public prepearScheduleWeek(weekLessons): any {
    return this.days.map(day => ({ day: day.name, lessons: weekLessons.filter(lesson => lesson.day.name === day.name) })).slice(0, 5);
  }
}
