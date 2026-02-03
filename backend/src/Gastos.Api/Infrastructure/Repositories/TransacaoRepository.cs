using Gastos.Api.Domain.Entities;
using Gastos.Api.Infrastructure.Data;
using Gastos.Api.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gastos.Api.Infrastructure.Repositories;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;

    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transacao>> GetAllAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Transacao>> GetByPessoaIdAsync(Guid pessoaId)
    {
        return await _context.Transacoes
            .Where(t => t.PessoaId == pessoaId)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Transacao> AddAsync(Transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        return transacao;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}