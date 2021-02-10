import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../shared/components/modal/modal.component';
import { TeacherApiSerice } from '../shared/services/teacher-api.service';
import { GroupApiSerice } from '../shared/services/group-api.service';
import { Subscription } from 'rxjs';
import { Day, Subject, TimeTable, Activity, Teacher, Audience, Curriculum, Faculty, Group } from '../shared/models';

@Component({
  selector: 'teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent {
  constructor(
    private teacherApiService: TeacherApiSerice,
    private groupApiService: GroupApiSerice,
    private formBuilder: FormBuilder
  ) {

  }
  @ViewChild('facultySheduleModal', { static: false }) facultySheduleModal: ModalComponent;

  public edit: boolean = false;
  public existLesson;
  public windowLesson = [];
  public scheduleForm: FormGroup;
  public schedule: Array<[]> = [];
  public selectedCurriculum: Curriculum = new Curriculum()
  public selectedTeacher: Teacher = new Teacher();
  public groupSchedules: Array<any> = [];
  public windowDayMap = {};

  public activities: Activity[];
  public audiences: Audience[];
  public subjects: Subject[];
  public teachers: Teacher[];
  public times: TimeTable[];
  public faculties: Faculty[];
  public groups: Group[];
  public days: Day[];
  public formSubscriber: Subscription;

  ngOnInit() {
    this.initSharedData();
    this.createForm();
  }

  public createForm() {
    this.scheduleForm = this.formBuilder.group({
      day: ['', Validators.required],
      timeTable: ['', Validators.required],
      subject: ['', Validators.required],
      activity: ['', Validators.required],
      group: ['', Validators.required],
      audience: ['', Validators.required],
      capacity: ['', Validators.required],
      pairOfWeek: ['', Validators.required],
      duration: ['', Validators.required]
    })

    this.formSubscriber = this.scheduleForm.valueChanges.subscribe(({ day, pairOfWeek, timeTable }) => {
      if (day !== null && pairOfWeek !== null && timeTable !== null && !this.scheduleForm.pristine) {
        const dayLessons: Object[] = this.schedule[pairOfWeek][day - 1]['lessons'];
        const days = dayLessons.sort((a, b) => a['timeTable'].id - b['timeTable'].id).map(lesson => lesson['timeTable'].id);
        this.windowLesson = this.times.filter(time => time.id < days[days.length - 1] && time.id > days[days.length - 2])
      }
    });

  }

  public initSharedData(): void {
    this.groupApiService.getAllGroups().subscribe((groups: Group[]) => this.groups = groups);
    Object.keys(localStorage).forEach(sharedDataItem => this[sharedDataItem] = JSON.parse(localStorage[sharedDataItem]));
  }

  getData(id: number) {
    this.teacherApiService.getScheduleById(id).subscribe((curriculum: Curriculum[]) => {
      console.log(curriculum);
      const noPariWeekLessons = curriculum.filter(shed => !shed.pairOfWeek);
      const pariWeekLessons = curriculum.filter(shed => shed.pairOfWeek);
      const scheduleWeek = this.prepearScheduleWeek(noPariWeekLessons);
      const scheduleWeekPair = this.prepearScheduleWeek(pariWeekLessons);
      console.log(curriculum);
      this.schedule.push(scheduleWeek);
      this.schedule.push(scheduleWeekPair);
    })
  }


  public prepearScheduleWeek(weekLessons): any {
    return this.days.map(day => ({ day: day.name, lessons: weekLessons.filter(lesson => lesson.day.name === day.name) })).slice(0, 5);
  }

  public selectTeacher({ value }): void {
    this.schedule = [];
    this.selectedTeacher = new Teacher();
    this.selectedTeacher = { ...this.teachers.find((teacher: Teacher) => teacher.id === Number(value)) };
    this.getData(this.selectedTeacher.id);

  }

  public changeForm({ name, value }) {
    if (this.selectedCurriculum[name].id) {
      this.selectedCurriculum[name].id = Number(value);
    } else {
      this.selectedCurriculum[name] = Number(value);
    }
  }

  public editSchedule(sheduleItem): void {
    this.selectedCurriculum = sheduleItem;
    this.facultySheduleModal.showWindow();
  }


  public deleteSchedule({ curriculumId }): void {
    this.teacherApiService.deleteScheduleById(curriculumId)
      .subscribe(() => {
        this.schedule = [];
        this.getData(this.selectedTeacher.id)
      })
  }


  public addSchedule(lesson): void {
    this.selectedCurriculum = new Curriculum();
    this.selectedCurriculum.group = lesson.group;
    this.selectedCurriculum.faculty = lesson.group.faculty;
    this.selectedCurriculum.teacher = this.selectedTeacher;
    this.facultySheduleModal.showWindow();
  }

  public saveCurriculum(): void {
    this.scheduleForm.reset();
    if (!this.scheduleForm.invalid) {
      this.selectedCurriculum.curriculumId ? this.saveEditedCurriculum() : this.saveAddedCurriculum();
    }
  }

  public saveEditedCurriculum(): void {
    console.log(this.selectedCurriculum);
    this.teacherApiService.updateSchedule(this.selectedCurriculum.curriculumId, this.selectedCurriculum)
      .subscribe((curriculum: Curriculum) => {
        this.schedule = [];
        this.getData(this.selectedTeacher.id)
        this.selectedCurriculum = new Curriculum();
        this.scheduleForm.reset();
      });
  }

  public saveAddedCurriculum(): void {
    this.teacherApiService.addSchedule(this.selectedCurriculum).subscribe(curriculum => {
      this.schedule = [];
      this.getData(this.selectedTeacher.id)
      this.selectedCurriculum = new Curriculum();
      this.scheduleForm.reset();
    });
  }
}
