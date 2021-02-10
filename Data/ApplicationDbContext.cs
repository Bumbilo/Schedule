using Microsoft.EntityFrameworkCore;
using System;

namespace Schedule.Data
{
    public class ApplicationDbContext : DbContext
    {

        public string connectionString = "Server=mssql;Database=ScheduleDB;User Id=SA;Password=Test@123; Integrated Security=False; MultipleActiveResultSets=True";

        public ApplicationDbContext() : base()
        {
        }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            Console.WriteLine(options);
        }

    }
}
