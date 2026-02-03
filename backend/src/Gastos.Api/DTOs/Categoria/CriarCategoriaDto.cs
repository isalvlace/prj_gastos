using Gastos.Api.Domain.Enums;

namespace Gastos.Api.DTOs.Categoria;

public record CriarCategoriaDto(string Descricao, FinalidadeCategoria Finalidade);