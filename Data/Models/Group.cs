using System;
namespace Schedule.Data.Models

{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Course { get; set; }
        public int FacultyId{ get; set; }
        public Faculty Faculty { get; set; }

        public Group()
        {
        }

        public Group(int id, string name, int course, Faculty faculty)
        {
         Id = id;
         Name = name;
         Course = course;
         Faculty = faculty;
        }
    }
}
