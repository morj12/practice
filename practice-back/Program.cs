using practice_back;
using practice_back.Dependencies.DataService;
using practice_back.Dependencies.State;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IState, State>();
builder.Services.AddSingleton<IDataService, DataService>();

builder.Services.AddHttpClient<IDataService, DataService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await app.Services.InitializeAsync();

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();
await app.RunAsync();
