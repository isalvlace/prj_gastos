using Gastos.Api.Domain.Entities;

namespace Gastos.Api.Infrastructure.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task<IEnumerable<Transacao>> GetAllAsync();
    Task<IEnumerable<Transacao>> GetByPessoaIdAsync(Guid pessoaId);
    Task<Transacao> AddAsync(Transacao transacao);
    Task<bool> SaveChangesAsync();
}