using Gastos.Api.Domain.Entities;

namespace Gastos.Api.Infrastructure.Repositories.Interfaces;

public interface IPessoaRepository
{
    Task<IEnumerable<Pessoa>> GetAllAsync();
    Task<Pessoa?> GetByIdAsync(Guid id);
    Task<Pessoa> AddAsync(Pessoa pessoa);
    void Update(Pessoa pessoa);
    void Delete(Pessoa pessoa);
    Task<bool> SaveChangesAsync();
}