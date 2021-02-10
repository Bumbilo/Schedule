using System;
namespace Schedule.Data.Models
{
    public class Day
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Day() {}

        public Day(int id, string name) 
        {
          Id = id;
          Name = name;
        }
    }
}
