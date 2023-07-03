using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Repository;

public static class StudentRepository
{
    private static StudentContext _context;
    static StudentRepository()
    {
        var dbContextOptions = new DbContextOptionsBuilder<StudentContext>();
        _context = new StudentContext(dbContextOptions.Options);
    }
    
    public static void createAsync(Student s)
    {
        _context.Students.AddAsync(s)
            .GetAwaiter()
            .OnCompleted(() => _context.SaveChangesAsync().GetAwaiter().GetResult());
    }
    
    public static Student GetAsync(string id)
    {
        return _context.Students
            .Where(s => s.id == id).FirstAsync().GetAwaiter().GetResult();
    }
    
    public static async Task UpdateAsync(Student s)
    {
        _context.Students.Update(s);
        await _context.SaveChangesAsync();
    }
    
    public static void DeleteAsync(string id)
    {
        _context.Students.Remove(GetAsync(id));
        _context.SaveChangesAsync().GetAwaiter().GetResult();
    }
    
    public static List<Student> GetAllAsync()
    {
        return _context.Students.ToListAsync().GetAwaiter().GetResult();
    }
}