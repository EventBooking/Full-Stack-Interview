namespace StudentApi.Models;

public class Student
{
    public string id { get; set; }

    public string Name { get; set; }
    
    public int Grade { get; set; } //-1 for pre-school, 0 for kindergarten, 1-12 for primary and secondary school, 13+ for college and university

    public DateOnly DateOfBirth { get; set; }
    
    public string HomeRoomId { get; set; }
}