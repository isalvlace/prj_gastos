using Gastos.Api.Domain.Enums;

namespace Gastos.Api.DTOs.Categoria;

public record CategoriaDto(Guid Id, string Descricao, FinalidadeCategoria Finalidade);