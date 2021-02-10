using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Schedule.Data.Repositories;
using Schedule.Data.Models;

namespace Schedule.Controllers
{

  [Route("api/[controller]/[action]")]
  [ApiController]
  public class FacultyController : ControllerBase
  {
    private readonly IRepository<Faculty> db;

    public FacultyController(IRepository<Faculty> db)
    {
      this.db = db;
    }

    //GET: /api/Faculty/id
    [HttpGet("{Id}")]
    public IEnumerable<Curriculum> GetScheduleById(int Id)
    {
      return db.GetScheduleById(Id);
    }

    [HttpPost]
    public Curriculum AddSchedule([FromBody] Curriculum curriculum)
    {
      return db.AddSchedule(curriculum);
    }

    [HttpPut("{Id}")]
    public Curriculum UpdateSchedule(int Id, [FromBody] Curriculum curriculum)
    {
      return db.UpdateSchedule(Id, curriculum);
    }

    [HttpDelete("{Id}")]
    public void DeleteSchedule(int Id)
    {
      try
      {
        db.DeleteSchedule(Id);
      }
      catch (InvalidCastException e)
      {
        Console.WriteLine(e);
      }
    }
  }
}
