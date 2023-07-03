using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Repository;

public class StudentContext : DbContext
{
    public StudentContext(DbContextOptions<StudentContext> options)
        : base(options)
    {
    }
    
    public DbSet<Student> Students { get; set; }
}