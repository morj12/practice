using practice_back.models;

namespace practice_back.Dependencies.DataService;

public interface IDataService
{
    Task<List<TodoModel>> GetTodos();
    Task<List<UserModel>> GetUsers();
}