using practice_back.Dependencies.State;

namespace practice_back;

public static class ServiceCollectionExtensions
{
    public static async Task InitializeAsync(this IServiceProvider provider)
    {
        var state = provider.GetRequiredService<IState>();
        await state.InitializeAsync();
    }
}