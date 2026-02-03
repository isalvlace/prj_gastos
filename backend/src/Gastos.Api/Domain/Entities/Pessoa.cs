namespace Gastos.Api.Domain.Entities;

public class Pessoa
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    
    public virtual ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}