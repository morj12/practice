using Newtonsoft.Json;
using practice_back.models;

namespace practice_back.Dependencies.DataService;

public class DataService(HttpClient httpClient) : IDataService
{
    private const string BaseUrl = "https://jsonplaceholder.typicode.com";

    public async Task<List<TodoModel>> GetTodos()
    {
        var result = await httpClient.GetAsync($"{BaseUrl}/todos");
        return JsonConvert.DeserializeObject<List<TodoModel>>(await result.Content.ReadAsStringAsync()) ?? [];
    }

    public async Task<List<UserModel>> GetUsers()
    {
        var result = await httpClient.GetAsync($"{BaseUrl}/users");
        return JsonConvert.DeserializeObject<List<UserModel>>(await result.Content.ReadAsStringAsync()) ?? [];
    }
}