using Gastos.Api.DTOs.Categoria;
using Gastos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _categoriaService;

    public CategoriasController(ICategoriaService categoriaService) => _categoriaService = categoriaService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaDto>>> Get() => Ok(await _categoriaService.ListarTodasAsync());

    [HttpPost]
    public async Task<ActionResult<CategoriaDto>> Post(CriarCategoriaDto dto)
    {
        var categoria = await _categoriaService.CriarAsync(dto);
        return Ok(categoria);
    }

	[HttpGet("totais-categoria")]
    public async Task<ActionResult<RelatorioGeralCategoriaDto>> GetTotaisCategoria() => Ok(await _categoriaService.ObterRelatorioTotaisCategoriaAsync());
}