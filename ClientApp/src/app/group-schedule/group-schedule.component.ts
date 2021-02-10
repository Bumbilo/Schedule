import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalComponent } from '../shared/components/modal/modal.component';
import { GroupApiSerice } from '../shared/services/group-api.service';
import { Day, Subject, TimeTable, Activity, Teacher, Audience, Curriculum, Faculty, Group } from '../shared/models';

@Component({
  selector: 'group-schedule',
  templateUrl: './group-schedule.component.html',
  styleUrls: ['./group-schedule.component.css']
})

export class GroupScheduleComponent implements OnInit {
  constructor(
    private groupApiSerice: GroupApiSerice,
    private formBuilder: FormBuilder
  ) {

  }
  @ViewChild('facultySheduleModal', { static: false }) facultySheduleModal: ModalComponent;

  scheduleForm: FormGroup;

  schedule: Array<[]> = [];

  public selectedCurriculum: Curriculum = new Curriculum()
  public selectedGroup: Group = new Group();
  public groupSchedules: Array<any> = [];

  public activities: Activity[];
  public audiences: Audience[];
  public subjects: Subject[];
  public teachers: Teacher[];
  public times: TimeTable[];
  public faculties: Faculty[];
  public groups: Group[];
  public days: Day[];

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
      teacher: ['', Validators.required],
      audience: ['', Validators.required],
      capacity: ['', Validators.required],
      pairOfWeek: ['', Validators.required],
      duration: ['', Validators.required]
    })
  }

  public initSharedData(): void {
    this.groupApiSerice.getAllGroups().subscribe((groups: Group[]) => this.groups = groups);
    Object.keys(localStorage).forEach(sharedDataItem => this[sharedDataItem] = JSON.parse(localStorage[sharedDataItem]));
  }

  getData(id: number) {
    this.groupApiSerice.getScheduleById(id).subscribe((curriculum: Curriculum[]) => {
      const noPariWeekLessons = curriculum.filter(shed => !shed.pairOfWeek);
      const pariWeekLessons = curriculum.filter(shed => shed.pairOfWeek);
      const scheduleWeek = this.prepearScheduleWeek(noPariWeekLessons);
      const scheduleWeekPair = this.prepearScheduleWeek(pariWeekLessons);
      this.schedule.push(scheduleWeek);
      this.schedule.push(scheduleWeekPair);
    })
  }


  public prepearScheduleWeek(weekLessons): any {
    return this.days.map(day => ({ day: day.name, lessons: weekLessons.filter(lesson => lesson.day.name === day.name) })).slice(0, 5);
  }

  public selectGroup({ value }): void {
    this.schedule = [];
    // this.groupsMap = {};
    this.selectedGroup = new Group();
    this.selectedGroup = { ...this.groups.find((group: Group) => group.id === Number(value)) };
    this.getData(this.selectedGroup.id);

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
    this.groupApiSerice.deleteScheduleById(curriculumId)
      .subscribe(() => {
        this.schedule = [];
        this.getData(this.selectedGroup.id)
      })
  }


  public addSchedule(lesson): void {
    this.selectedCurriculum = new Curriculum();
    this.selectedCurriculum.group = lesson.group;
    this.selectedCurriculum.faculty = lesson.group.faculty;
    this.facultySheduleModal.showWindow();
  }

  public saveCurriculum(): void {
    if (!this.scheduleForm.invalid) {
      this.selectedCurriculum.curriculumId ? this.saveEditedCurriculum() : this.saveAddedCurriculum();
    }
  }

    public saveEditedCurriculum(): void {
    this.groupApiSerice.updateSchedule(this.selectedCurriculum.curriculumId, this.selectedCurriculum)
      .subscribe((curriculum: Curriculum) => {
        this.schedule = [];
        this.getData(this.selectedGroup.id)
        this.selectedCurriculum = new Curriculum();
        this.scheduleForm.reset();
      });
  }

    public saveAddedCurriculum(): void {
    this.groupApiSerice.addSchedule(this.selectedCurriculum).subscribe(curriculum => {
      this.schedule= [];
      this.getData(this.selectedGroup.id)
      this.selectedCurriculum = new Curriculum();
      this.scheduleForm.reset();
    });
  }
}
