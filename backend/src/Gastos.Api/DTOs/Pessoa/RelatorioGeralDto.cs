namespace Gastos.Api.DTOs.Pessoa;

public record RelatorioGeralDto(
    List<TotalPorPessoaDto> Pessoas,
    decimal TotalGeralReceitas,
    decimal TotalGeralDespesas,
    decimal SaldoLiquidoGeral
);