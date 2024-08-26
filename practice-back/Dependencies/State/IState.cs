using practice_back.models;

namespace practice_back.Dependencies.State;

public interface IState
{
    Task InitializeAsync();
    List<UserModel> GetUsers();
    List<TodoModel> GetTodos(int? userId);
    TodoModel AddTodo(TodoModel todo);
    TodoModel? UpdateTodo(int id, TodoModel todo);
    bool DeleteTodo(int id);
}