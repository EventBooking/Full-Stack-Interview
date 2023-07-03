using StudentApi.Models;

namespace StudentApi.Repository;

public static class StudentService
{
    public static Student GetAsync(string id)
    {
        return StudentRepository.GetAsync(id);
    }
    
    public static IEnumerable<Student> GetByGradeAsync(int grade)
    {
        var students = StudentRepository.GetAllAsync();
        return students.Where(s => s.Grade == grade).ToList();
    }
    
    public static IEnumerable<Student> GetByHomeroomAsync(string homeroomId)
    {
        var students = StudentRepository.GetAllAsync();
        return students.Where(s => s.HomeRoomId == homeroomId).ToList();
    }
    
    public static async Task UpdateAsync(Student s)
    {
        try
        {
            await StudentRepository.UpdateAsync(s);
        }
        catch (Exception ex)
        {
            Console.Write("Error updating student. Student not found.");
            throw ex;
        }
    }

    public static void BulkUpdateAsync(IEnumerable<Student> s)
    {
        var tasks = s.Select(st => UpdateAsync(st));
        Task.WaitAll(tasks.ToArray());
    }
    
    private static void DeleteAsync(string id)
    {
        StudentRepository.DeleteAsync(id);
    }
}