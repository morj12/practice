using practice_back.Dependencies.DataService;
using practice_back.models;

namespace practice_back.Dependencies.State;

public class State(IDataService dataService) : IState
{
    private List<TodoModel> Todos { get; set; } = [];
    private List<UserModel> Users { get; set; } = [];

    public async Task InitializeAsync()
    {
        Todos = await dataService.GetTodos().ConfigureAwait(false);
        Users = await dataService.GetUsers().ConfigureAwait(false);
    }

    public List<UserModel> GetUsers()
    {
        return Users;
    }

    public List<TodoModel> GetTodos(int? userId)
    {
        return userId != null ? Todos.Where(todo => todo.UserId == userId).ToList() : Todos;
    }

    public TodoModel AddTodo(TodoModel todo)
    {
        todo.Id = new Random().Next(int.MaxValue);
        Todos.Insert(0, todo);
        return todo;
    }

    public TodoModel? UpdateTodo(int id, TodoModel todo)
    {
        var todoToUpdate = Todos.Find(todoModel => todoModel.Id == id);
        if (todoToUpdate == null) return null;
        todoToUpdate.Completed = todo.Completed;
        todoToUpdate.Title = todo.Title;
        return todoToUpdate;
    }

    public bool DeleteTodo(int id)
    {
        var todoToDelete = Todos.Find(todoModel => todoModel.Id == id);
        if (todoToDelete == null) return false;
        Todos.Remove(todoToDelete);
        return true;
    }
}