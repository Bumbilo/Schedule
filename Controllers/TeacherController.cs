
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Schedule.Data.Repositories;
using Schedule.Data.Models;


namespace Schedule.Controllers
{
  [Route("api/[controller]/[action]")]
  [ApiController]
  public class TeacherController : ControllerBase

  {
    private readonly IRepository<Teacher> db;

    public TeacherController(IRepository<Teacher> db)
    {
      this.db = db;
    }

    [HttpGet("{id}")]
    public IEnumerable<Curriculum> GetScheduleById(int id)
    {
      return db.GetScheduleById(id);
    }

    [HttpDelete("{Id}")]
    public void DeleteSchedule(int Id)
    {
      db.DeleteSchedule(Id);
    }

    [HttpPut("{Id}")]
    public Curriculum UpdateSchedule(int Id, [FromBody] Curriculum curriculum)
    {
      return db.UpdateSchedule(Id, curriculum);
    }

    [HttpPost]
    public Curriculum AddSchedule([FromBody] Curriculum curriculum)
    {
      return db.AddSchedule(curriculum);
    }
  }
}
