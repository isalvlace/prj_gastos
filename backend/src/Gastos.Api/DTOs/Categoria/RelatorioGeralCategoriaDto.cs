namespace Gastos.Api.DTOs.Categoria;

public record RelatorioGeralCategoriaDto(
    List<TotalPorCategoriaDto> Categorias,
    decimal TotalGeralReceitas,
    decimal TotalGeralDespesas,
    decimal SaldoLiquidoGeral
);