using System;
using System.Collections.Generic;

namespace Schedule.Data.Models
{
    public class Curriculum
    {
        public int CurriculumId{ get; set; }
        public Group Group { get; set; }
        public TimeTable TimeTable { get; set; }
        public Day Day { get; set; }
        public Subject Subject { get; set; }
        public Teacher Teacher{ get; set; }
        public Audience Audience { get; set; }
        public Activity Activity{ get; set; }
        public Faculty Faculty {get; set; }
        public int Capacity { get; set; }
        public int PairOfWeek { get; set; }
        public int Duration { get; set; }
      
        public Curriculum()
        {
        }
    }
}
