using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Schedule.Data.Models;

namespace Schedule.Data.Repositories
{
  public class GroupRepository : SharedRepository, IRepository<Group>
  {
    private readonly ApplicationDbContext db;


    public GroupRepository()
    {
    }

    public GroupRepository(ApplicationDbContext db)
    {
      this.db = db;
    }

    public void Add(Group entity)
    {
      throw new NotImplementedException();
    }

    public void Delete(int id)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<Group> GetAll()
    {
      List<Group> listOfGroups = new List<Group>();
      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = "SELECT g.Id, g.[Name], g.Course, g.FacultyId, f.Name FROM Groups g JOIN Faculties f ON g.FacultyId = f.Id";
        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();
        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Group group = new Group();
            group.Id = (int)reader[0];
            group.Name = reader[1].ToString();
            group.Course = (int)reader[2];
            group.Faculty = new Faculty((int)reader[3], reader[4].ToString());
            listOfGroups.Add(group);
          }
        }
      }
      return listOfGroups;
    }

    public IEnumerable<Curriculum> GetScheduleById(int id)
    {
      List<Curriculum> listOfCurriculum = new List<Curriculum>();
      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @$"
              SELECT
                g.id,
                g.Name,
                g.Course,
                fac.Id,
                fac.Name,
                timeT.Id,
                timeT.StartTime,
                timeT.EndTime,
                d.Id,
                d.Name,
                sub.Id,
                sub.Name,
                teach.Id,
                teach.LastName,
                teach.FirstName,
                teach.MiddleName,
                a.Id,
                a.Name,
                act.Id,
                act.Name,
                s.PairOfWeek,
                s.GroupCapacity,
                s.Id,
                s.Duration

              FROM Schedule s
                JOIN Groups g ON s.GroupId = g.Id
                JOIN Days d ON s.DayId = d.Id
                JOIN Subjects sub ON sub.Id = s.SubjectId
                JOIN TimeTable timeT ON timeT.Id = s.TimeTableId
                JOIN Teachers teach  ON teach.Id = s.TeacherId
                JOIN Audiences a ON a.Id = s.ActivityId
                JOIN Activities act ON act.Id = s.ActivityId
                JOIN Faculties fac ON g.FacultyId = fac.Id
              WHERE g.Id= {id}
              ORDER BY timeT.Id";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Curriculum curriculum = new Curriculum();
            curriculum.Group = new Group((int)reader[0], reader[1].ToString(), (int)reader[2], new Faculty((int)reader[3], reader[4].ToString()));
            curriculum.Faculty = new Faculty((int)reader[3], reader[4].ToString());
            curriculum.TimeTable = new TimeTable((int)reader[5], reader[6].ToString(), reader[7].ToString());
            curriculum.Day = new Day((int)reader[8], reader[9].ToString());
            curriculum.Subject = new Subject((int)reader[10], reader[11].ToString());
            curriculum.Teacher = new Teacher((int)reader[12], reader[13].ToString(), reader[14].ToString(), reader[15].ToString());
            curriculum.Audience = new Audience((int)reader[16], reader[17].ToString());
            curriculum.Activity = new Activity((int)reader[18], reader[19].ToString());
            curriculum.PairOfWeek = (bool)reader[20] ? 1 : 0;
            curriculum.Capacity = (bool)reader[21] ? 1 : 0;
            curriculum.CurriculumId = (int)reader[22];
            curriculum.Duration = (bool)reader[23] ? 1 : 0;
            listOfCurriculum.Add(curriculum);
          }
        }
      }

      return listOfCurriculum;
    }

    public Group GetById(int id)
    {
      throw new NotImplementedException();
    }

    public Group GetByName(string name)
    {
      throw new NotImplementedException();
    }

    public Curriculum UpdateSchedule(int Id, Curriculum curriculum)
    {
      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @$"
                UPDATE Schedule
                SET
                    GroupId = {curriculum.Group.Id},
                    SubjectId = {curriculum.Subject.Id},
                    TeacherId = {curriculum.Teacher.Id},
                    DayId = {curriculum.Day.Id},
                    TimeTableId = {curriculum.TimeTable.Id},
                    AudienceId = {curriculum.Audience.Id},
                    ActivityId = {curriculum.Activity.Id},
                    GroupCapacity = {curriculum.Capacity},
                    PairOfWeek = {curriculum.PairOfWeek},
                    Duration = {curriculum.Duration}
                WHERE
                  Id = {Id}";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();
        sqlCommand.ExecuteNonQuery();
      }
      return curriculum;
    }

    public void DeleteSchedule(int Id)
    {
      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @$"DELETE FROM Schedule
                WHERE Schedule.Id = {Id}";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();
        sqlCommand.ExecuteNonQuery();
      }
    }

    public Curriculum AddSchedule(Curriculum curriculum)
    {
      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @$"
                INSERT INTO Schedule (
                    GroupId,
                    SubjectId,
                    TeacherId,
                    DayId,
                    TimeTableId,
                    AudienceId,
                    ActivityId,
                    GroupCapacity,
                    PairOfWeek,
                    Duration
                )
                VALUES(
                    {curriculum.Group.Id},
                    {curriculum.Subject.Id},
                    {curriculum.Teacher.Id},
                    {curriculum.Day.Id},
                    {curriculum.TimeTable.Id},
                    {curriculum.Audience.Id},
                    {curriculum.Activity.Id},
                    {curriculum.Capacity},
                    {curriculum.PairOfWeek},
                    {curriculum.Duration}
                )";

        Console.WriteLine(query);

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();
        sqlCommand.ExecuteNonQuery();
      }

      return curriculum;
    }

    public void Update(Group entity)
    {
      throw new NotImplementedException();
    }
  }
}
