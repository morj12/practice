using Microsoft.AspNetCore.Mvc;
using practice_back.Dependencies.State;
using practice_back.models;

namespace practice_back;

[ApiController]
[Route("[controller]")]
public class TodoController(IState state) : ControllerBase
{

    [HttpGet("users")]
    public ActionResult<List<UserModel>> GetUsers()
    {
        return Ok(state.GetUsers());
    }

    [HttpGet("todos")]
    public ActionResult<List<TodoModel>> GetTodos([FromQuery] int? userId)
    {
        return Ok(state.GetTodos(userId));
    }

    [HttpPost("todos")]
    public ActionResult<TodoModel> AddTodo([FromBody] TodoModel todo)
    {
        return Ok(state.AddTodo(todo));
    }

    [HttpPatch("todos/{id:int}")]
    public ActionResult<TodoModel> UpdateTodo([FromRoute] int id, [FromBody] TodoModel todo)
    {
        var response = state.UpdateTodo(id, todo);
        return response != null ? Ok(response) : NotFound("The todo was not found");
    }

    [HttpDelete("todos/{id:int}")]
    public ActionResult<TodoModel> DeleteTodo([FromRoute] int id)
    {
        var result = state.DeleteTodo(id);
        return result ? Ok() : NotFound("The todo was not found");
    }
}