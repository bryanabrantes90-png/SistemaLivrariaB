import { useState } from 'react'
import CardLivro from '../components/CardLivro'

// Dados temporários (depois virão da API Java)
const livrosTemp = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', isbn: '9788535903253', preco: 29.90 },
  { id: 2, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', isbn: '9788533613379', preco: 59.90 },
  { id: 3, titulo: '1984', autor: 'George Orwell', isbn: '9788522106169', preco: 24.90 }
]

export default function LivrosLista() {
  const [livros] = useState(livrosTemp)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Lista de Livros</h2>
        <a href="/livros/cadastrar" className="btn btn-success">+ Novo Livro</a>
      </div>

      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="grid">
          {livros.map(livro => (
            <CardLivro key={livro.id} livro={livro} />
          ))}
        </div>
      )}
    </div>
  )
}