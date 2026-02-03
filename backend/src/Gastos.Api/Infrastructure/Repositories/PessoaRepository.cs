using Gastos.Api.Domain.Entities;
using Gastos.Api.Infrastructure.Data;
using Gastos.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gastos.Api.Infrastructure.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Pessoa>> GetAllAsync()
    {
        return await _context.Pessoas.AsNoTracking().ToListAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(Guid id)
    {
        return await _context.Pessoas.FindAsync(id);
    }

    public async Task<Pessoa> AddAsync(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
        return pessoa;
    }

    public void Update(Pessoa pessoa)
    {
        _context.Pessoas.Update(pessoa);
    }

    public void Delete(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}