using System;
namespace Schedule.Data.Models
{
    public class TimeTable
    {
        public int Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }

        public TimeTable()
        {
        }

        public TimeTable(int id, string startTime, string endTime)
        {
          Id = id;
          StartTime = startTime;
          EndTime = endTime;
        }
    }
}
