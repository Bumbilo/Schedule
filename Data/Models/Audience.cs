using System;

namespace Schedule.Data.Models
{
    public class Audience 
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Audience() {
        }
        
        public Audience(int id, string name) {
          Id = id;
          Name = name;
        }
    }
}
