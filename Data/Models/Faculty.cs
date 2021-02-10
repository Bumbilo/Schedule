using System;
namespace Schedule.Data.Models
{
    public class Faculty
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Faculty()
        {
        }

        public Faculty(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
