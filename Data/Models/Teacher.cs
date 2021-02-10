using System;
namespace Schedule.Data.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }

        public Teacher()
        {
        }

        public Teacher(int id, string firstName, string middleName, string lastName)
        {
          Id = id;
          FirstName = firstName;
          MiddleName = middleName;
          LastName = lastName;
        }
    }
}
