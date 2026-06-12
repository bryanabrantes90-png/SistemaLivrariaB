export default function CardLivro({ livro }) {
  return (
    <div style={{ background: 'white', padding: '1.2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3>{livro.titulo}</h3>
      <p><strong>Autor:</strong> {livro.autor || 'Não informado'}</p>
      <p><strong>ISBN:</strong> {livro.isbn || 'Não informado'}</p>
      <p><strong>Preço:</strong> R$ {livro.preco ? livro.preco.toFixed(2) : '0,00'}</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-primary">Ver</button>
        <button className="btn btn-success">Editar</button>
      </div>
    </div>
  )
}