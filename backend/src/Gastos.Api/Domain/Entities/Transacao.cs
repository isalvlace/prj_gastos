using Gastos.Api.Domain.Enums;
namespace Gastos.Api.Domain.Entities;

public class Transacao {
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }  
    public Guid CategoriaId { get; set; }
    public virtual Categoria Categoria { get; set; } = null!;
    public Guid PessoaId { get; set; }
    public virtual Pessoa Pessoa { get; set; } = null!;
}