using Microsoft.AspNetCore.Mvc;

using Gastos.Api.Services.Interfaces;
using Gastos.Api.DTOs.Transacao;
using Gastos.Api.Common.Exceptions;

namespace Gastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacoesController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransacaoDto>>> Get()
    {
        var transacoes = await _transacaoService.ListarTodasAsync();
        return Ok(transacoes);
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoDto>> Post([FromBody] CriarTransacaoDto dto)
    {
        try
        {
            var transacao = await _transacaoService.CriarAsync(dto);
            return Ok(transacao);
        }
        catch (BusinessException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
