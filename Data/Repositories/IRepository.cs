using System.Collections.Generic;
using Schedule.Data.Models;

namespace Schedule.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetById(int id);
        TEntity GetByName(string name);
        IEnumerable<Curriculum> GetScheduleById(int id);

        IEnumerable<Day> GetAllDays();
        IEnumerable<TimeTable> GetAllTimes();
        IEnumerable<Subject> GetAllSubjects();
        IEnumerable<Activity> GetAllActivities();
        IEnumerable<Teacher> GetAllTeachers();
        IEnumerable<Audience> GetAllAudiences();
        IEnumerable<Faculty> GetAllFaculties();

        Curriculum UpdateSchedule(int Id, Curriculum curriculum);
        void DeleteSchedule(int Id);
        Curriculum AddSchedule(Curriculum curriculum);

        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(int id);
    }
}
