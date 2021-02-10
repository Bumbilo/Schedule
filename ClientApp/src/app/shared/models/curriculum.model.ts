import { Group, Day, Subject, Teacher, TimeTable, Audience, Activity, Faculty } from './';

export class Curriculum {
  public curriculumId: number;
  public day: Day  = new Day();
  public group: Group = new Group();
  public subject: Subject = new Subject();
  public teacher: Teacher = new Teacher();
  public timeTable: TimeTable = new TimeTable();
  public audience: Audience = new Audience(); 
  public activity: Activity = new Activity();
  public faculty: Faculty = new Faculty();
  public capacity: number = null; 
  public pairOfWeek: number = null ; 
  public duration: number = null;
}
