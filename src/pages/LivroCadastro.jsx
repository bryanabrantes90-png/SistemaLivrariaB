import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LivroCadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    preco: '',
    categoria: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui depois vamos conectar com a API Java
    console.log('Dados do livro:', form)
    alert('Livro cadastrado com sucesso!')
    navigate('/livros')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Cadastrar Novo Livro</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
        <div className="form-group">
          <label>Título</label>
          <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Autor</label>
          <input type="text" name="autor" value={form.autor} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input type="text" name="isbn" value={form.isbn} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Preço (R$)</label>
          <input type="number" step="0.01" name="preco" value={form.preco} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="">Selecione...</option>
            <option value="romance">Romance</option>
            <option value="ficcao">Ficção</option>
            <option value="biografia">Biografia</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>Cadastrar</button>
      </form>
    </div>
  )
}