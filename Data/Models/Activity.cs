using System;

namespace Schedule.Data.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Activity() {
        }

        public Activity(int id, string name) {
          Id = id;
          Name = name;
        }

    }
}
