using Gastos.Api.DTOs.Pessoa;
using Gastos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService) => _pessoaService = pessoaService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PessoaDto>>> Get() => Ok(await _pessoaService.ListarTodasAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<PessoaDto>> GetById(Guid id)
    {
        var pessoa = await _pessoaService.BuscarPorIdAsync(id);
        return pessoa == null ? NotFound() : Ok(pessoa);
    }

    [HttpPost]
    public async Task<ActionResult<PessoaDto>> Post(CriarPessoaDto dto)
    {
        var pessoa = await _pessoaService.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = pessoa.Id }, pessoa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, CriarPessoaDto dto)
    {
        var sucesso = await _pessoaService.AtualizarAsync(id, dto);
        return sucesso ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var sucesso = await _pessoaService.DeletarAsync(id);
        return sucesso ? NoContent() : NotFound();
    }

    [HttpGet("totais")]
    public async Task<ActionResult<RelatorioGeralDto>> GetTotais() => Ok(await _pessoaService.ObterRelatorioTotaisAsync());
}