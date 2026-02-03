using Gastos.Api.Domain.Entities;
using Gastos.Api.DTOs.Pessoa;
using Gastos.Api.Infrastructure.Repositories.Interfaces;
using Gastos.Api.Services.Interfaces;
using Gastos.Api.Domain.Enums;

namespace Gastos.Api.Services;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ITransacaoRepository _transacaoRepository;

    public PessoaService(IPessoaRepository pessoaRepository, ITransacaoRepository transacaoRepository)
    {
        _pessoaRepository = pessoaRepository;
        _transacaoRepository = transacaoRepository;
    }

    public async Task<IEnumerable<PessoaDto>> ListarTodasAsync()
    {
        var pessoas = await _pessoaRepository.GetAllAsync();
        return pessoas.Select(p => new PessoaDto(p.Id, p.Nome, p.Idade));
    }

    public async Task<PessoaDto?> BuscarPorIdAsync(Guid id)
    {
        var pessoa = await _pessoaRepository.GetByIdAsync(id);
        return pessoa == null ? null : new PessoaDto(pessoa.Id, pessoa.Nome, pessoa.Idade);
    }

    public async Task<PessoaDto> CriarAsync(CriarPessoaDto dto)
    {
        var pessoa = new Pessoa { Nome = dto.Nome, Idade = dto.Idade };
        await _pessoaRepository.AddAsync(pessoa);
        await _pessoaRepository.SaveChangesAsync();
        return new PessoaDto(pessoa.Id, pessoa.Nome, pessoa.Idade);
    }

    public async Task<bool> AtualizarAsync(Guid id, CriarPessoaDto dto)
    {
        var pessoa = await _pessoaRepository.GetByIdAsync(id);
        if (pessoa == null) return false;

        pessoa.Nome = dto.Nome;
        pessoa.Idade = dto.Idade;

        _pessoaRepository.Update(pessoa);
        return await _pessoaRepository.SaveChangesAsync();
    }

    public async Task<bool> DeletarAsync(Guid id)
    {
        var pessoa = await _pessoaRepository.GetByIdAsync(id);
        if (pessoa == null) return false;

        _pessoaRepository.Delete(pessoa);
        return await _pessoaRepository.SaveChangesAsync();
    }

    public async Task<RelatorioGeralDto> ObterRelatorioTotaisAsync()
    {
        var transacoes = await _transacaoRepository.GetAllAsync();
        var pessoas = await _pessoaRepository.GetAllAsync();

        var listaTotais = pessoas.Select(p => {
            var tPessoa = transacoes.Where(t => t.PessoaId == p.Id).ToList();
            var receitas = tPessoa.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
            var despesas = tPessoa.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);
            
            return new TotalPorPessoaDto(p.Id, p.Nome, receitas, despesas, receitas - despesas);
        }).ToList();

        var totalGeralReceitas = listaTotais.Sum(x => x.TotalReceitas);
        var totalGeralDespesas = listaTotais.Sum(x => x.TotalDespesas);

        return new RelatorioGeralDto(
            listaTotais,
            totalGeralReceitas,
            totalGeralDespesas,
            totalGeralReceitas - totalGeralDespesas
        );
    }
}