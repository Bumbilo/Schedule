using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Schedule.Data.Repositories;
using Schedule.Data.Models;

namespace Schedule.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SharedController: ControllerBase
    {
        private readonly SharedRepository db;

        public SharedController(SharedRepository db)
        {
            this.db = db;
        }

        [HttpGet]
        public IEnumerable<Day> GetAllDays()
        {
            return db.GetAllDays();
        }

        [HttpGet]
        public IEnumerable<Subject> GetAllSubjects()
        {
            return db.GetAllSubjects();
        }

        [HttpGet]
        public IEnumerable<TimeTable> GetAllTimes() 
        {
            return db.GetAllTimes();
        }

        [HttpGet]
        public IEnumerable<Activity> GetAllActivities()
        {
            return db.GetAllActivities();
        }


        [HttpGet]
        public IEnumerable<Teacher> GetAllTeachers() 
        {
            return db.GetAllTeachers();
        }

        [HttpGet]
        public IEnumerable<Audience> GetAllAudiences() 
        {
            return db.GetAllAudiences();
        }

        [HttpGet]
        public IEnumerable<Faculty> GetAllFaculties() 
        {
            return db.GetAllFaculties();
        }
    }
}
