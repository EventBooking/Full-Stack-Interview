using Microsoft.AspNetCore.Mvc;
using StudentApi.Models;
using StudentApi.Repository;

namespace StudentApi.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    [HttpPost]
    public ActionResult Post(Student student)
    {
        if (student.Name == null)
            return StatusCode(500); 
        
        StudentRepository.createAsync(student);
        return Ok();
    }
    
    [HttpGet]
    public IActionResult Get(string id)
    {
        if (string.IsNullOrEmpty(id))
            return StatusCode(500);
        
        var Student = StudentService.GetAsync(id);
        return Ok(Student);
    }
    
    [HttpGet]
    [Route("filter/{grade}/{homeroomId}")]
    public IActionResult GetBy(int grade, string homeroomId)
    {
        if (grade < 0 || string.IsNullOrEmpty(homeroomId))
            return StatusCode(500);
        
        var studentsByHomeRoom = StudentService.GetByHomeroomAsync(homeroomId);
        var studentsByGrade = StudentService.GetByGradeAsync(grade);
        var Students = studentsByHomeRoom.Intersect(studentsByGrade);
        return Ok(Students);
    }
    
    [HttpPut]
    public IActionResult Put(Student student)
    {
        if (student.Name == null || student.id == null)
            return StatusCode(400);
        
        StudentService.UpdateAsync(student);
        return Ok();
    }
    
    [HttpPut]
    [Route("bulk")]
    public IActionResult BulkPut(IEnumerable<Student> students)
    {
        if (students == null)
            return StatusCode(500);
        
        StudentService.BulkUpdateAsync(students);
        return Ok();
    }
    
    [HttpDelete]
    public IActionResult Delete(string id)
    {
        if (string.IsNullOrEmpty(id))
            return StatusCode(500);
        
        StudentRepository.DeleteAsync(id);
        return Ok();
    }
}