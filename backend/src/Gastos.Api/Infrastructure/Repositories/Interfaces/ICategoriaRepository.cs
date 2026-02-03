using Gastos.Api.Domain.Entities;

namespace Gastos.Api.Infrastructure.Repositories.Interfaces;

public interface ICategoriaRepository
{
    Task<IEnumerable<Categoria>> GetAllAsync();
    Task<Categoria?> GetByIdAsync(Guid id);
    Task<Categoria> AddAsync(Categoria categoria);
    Task<bool> SaveChangesAsync();
}