using System;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using Schedule.Data.Models;

namespace Schedule.Data.Repositories
{
  public class SharedRepository{
    private readonly ApplicationDbContext db;

    public SharedRepository() {
    }

    public SharedRepository(ApplicationDbContext db) {
      this.db = db;
    }

    public IEnumerable<Day> GetAllDays()
    {
      List<Day> listOfDays = new List<Day>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Days";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Day day  = new Day();
            day.Id   = (int)reader[0];
            day.Name = reader[1].ToString();
            listOfDays.Add(day);
          }
        }
      }

      return listOfDays;
    }

    public IEnumerable<TimeTable> GetAllTimes()
    {
      List<TimeTable> listOfTimes = new List<TimeTable>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM TimeTable";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            TimeTable time = new TimeTable();
            time.Id        = (int)reader[0];
            time.StartTime = reader[1].ToString();
            time.EndTime   = reader[2].ToString();
            listOfTimes.Add(time);
          }
        }
      }
      return listOfTimes;
    }

    public IEnumerable<Subject> GetAllSubjects()
    {
      List<Subject> listOfSubjects = new List<Subject>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Subjects";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Subject subject = new Subject();
            subject.Id      = (int)reader[0];
            subject.Name    = reader[1].ToString();
            listOfSubjects.Add(subject);
          }
        }
      }
      return listOfSubjects;
    }

    public IEnumerable<Activity> GetAllActivities()
    {
      List<Activity> listOfActivities = new List<Activity>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Activities";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Activity activity = new Activity();
            activity.Id       = (int)reader[0];
            activity.Name     = reader[1].ToString();
            listOfActivities.Add(activity);
          }
        }
      }
      return listOfActivities;
    }

    public IEnumerable<Teacher> GetAllTeachers()
    {
      List<Teacher> listOfTeachers = new List<Teacher>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Teachers";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Teacher teacher    = new Teacher();
            teacher.Id         = (int)reader[0];
            teacher.FirstName  = reader[1].ToString();
            teacher.MiddleName = reader[2].ToString();
            teacher.LastName   = reader[3].ToString();
            listOfTeachers.Add(teacher);
          }
        }
      }
      return listOfTeachers;
    }

    public IEnumerable<Audience> GetAllAudiences()
    {
      List<Audience> listOfAudiences = new List<Audience>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Audiences";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Audience audience = new Audience();
            audience.Id   = (int)reader[0];
            audience.Name = reader[1].ToString();
            listOfAudiences.Add(audience);
          }
        }
      }
      return listOfAudiences;
    }

    public IEnumerable<Faculty> GetAllFaculties()
    {
      List<Faculty> listOfFaculties = new List<Faculty>();

      using (SqlConnection conn = new SqlConnection(db.connectionString))
      {
        string query = @"SELECT * FROM Faculties";

        SqlCommand sqlCommand = new SqlCommand(query, conn);
        conn.Open();

        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Faculty faculty = new Faculty();
            faculty.Id   = (int)reader[0];
            faculty.Name = reader[1].ToString();
            listOfFaculties.Add(faculty);
          }
        }
      }
      return listOfFaculties;
    }
  }
}
