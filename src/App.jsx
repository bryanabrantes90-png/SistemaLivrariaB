/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react';
import { salvarLivro, listarLivros, atualizarLivro, excluirLivro } from './services/api';
import './App.css';

function App() {
  const [form, setForm] = useState({ 
    id: null, titulo: '', autor: '', preco: '', quantidade: '', descricao: '', isbn: '' 
  });
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState('');

  // ✅ Carrega lista SEMPRE que abrir e depois de salvar
  useEffect(() => {
    carregarListaDoBanco();
  }, []);

  const carregarListaDoBanco = async () => {
    setCarregando(true);
    const dados = await listarLivros();
    setLivros(dados);
    setCarregando(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
  };

  const limparFormulario = () => {
    setForm({ id: null, titulo: '', autor: '', preco: '', quantidade: '', descricao: '', isbn: '' });
    setModoEdicao(false);
    setModalAberto(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.preco || !form.quantidade) {
      mostrarMensagem("Preencha os campos obrigatórios!", "erro");
      return;
    }

    try {
      if (modoEdicao) {
        await atualizarLivro(form.id, form);
        mostrarMensagem("Livro atualizado com sucesso!", "sucesso");
      } else {
        await salvarLivro(form);
        mostrarMensagem("Livro cadastrado com sucesso!", "sucesso");
      }
      limparFormulario();
      await carregarListaDoBanco(); // ✅ ATUALIZA A LISTA AUTOMATICAMENTE
    } catch (error) {
      mostrarMensagem("Erro ao salvar!", "erro");
    }
  };

  const iniciarEdicao = (livro) => {
    setForm({
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      preco: livro.preco,
      quantidade: livro.quantidadeEstoque,
      descricao: livro.descricao || '',
      isbn: livro.isbn || ''
    });
    setModoEdicao(true);
    setModalAberto(true);
  };

  const confirmarExclusao = (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      executarExclusao(id);
    }
  };

  const executarExclusao = async (id) => {
    try {
      await excluirLivro(id);
      mostrarMensagem("Livro excluído!", "sucesso");
      await carregarListaDoBanco(); // ✅ ATUALIZA DEPOIS DE EXCLUIR
    } catch (error) {
      mostrarMensagem("Erro ao excluir!", "erro");
    }
  };

  // Filtra livros
  const livrosFiltrados = livros.filter(livro => 
    livro.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Cabeçalho */}
      <header className="app-header">
        <h1>Sistema de Livraria</h1>
      </header>

      {/* Mensagem */}
      {mensagem.texto && (
        <div className={`mensagem ${mensagem.tipo}`}>
          {mensagem.texto}
        </div>
      )}

      <main className="main-content">
        {/* Barra superior: Botão Novo + Busca */}
        <div className="barra-acoes">
          <button 
            className="btn-novo"
            onClick={() => { limparFormulario(); setModalAberto(true); }}
          >
            ➕ Cadastrar Novo Livro
          </button>

          <div className="busca">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Buscar por título ou autor..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela */}
        <section className="card-tabela">
          <div className="cabecalho-tabela">
            <h2>📋 Livros Cadastrados</h2>
            <span className="total">Total: {livrosFiltrados.length} livro(s)</span>
          </div>

          {carregando ? (
            <div className="carregando">Carregando...</div>
          ) : livrosFiltrados.length === 0 ? (
            <div className="vazio">Nenhum livro cadastrado ainda.</div>
          ) : (
            <div className="tabela-wrapper">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>ISBN</th>
                    <th>Data Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {livrosFiltrados.map(livro => (
                    <tr key={livro.id}>
                      <td className="id">{livro.id}</td>
                      <td className="titulo">{livro.titulo}</td>
                      <td className="autor">{livro.autor}</td>
                      <td className="preco">R$ {Number(livro.preco).toFixed(2)}</td>
                      <td className="estoque">{livro.quantidadeEstoque}</td>
                      <td className="isbn">{livro.isbn || '-'}</td>
                      <td className="data">{new Date(livro.dataCadastro).toLocaleDateString('pt-BR')}</td>
                      <td className="acoes">
                        <button className="btn-editar" onClick={() => iniciarEdicao(livro)}>✏️</button>
                        <button className="btn-excluir" onClick={() => confirmarExclusao(livro.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* MODAL */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-cabecalho">
              <h2>{modoEdicao ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h2>
              <button className="btn-fechar" onClick={limparFormulario}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="linha">
                <div className="campo">
                  <label>Título *</label>
                  <input type="text" name="titulo" value={form.titulo} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <label>Autor *</label>
                  <input type="text" name="autor" value={form.autor} onChange={handleChange} required />
                </div>
              </div>

              <div className="linha">
                <div className="campo">
                  <label>Preço (R$) *</label>
                  <input type="number" step="0.01" name="preco" value={form.preco} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <label>Quantidade *</label>
                  <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} required />
                </div>
              </div>

              <div className="linha">
                <div className="campo">
                  <label>Descrição</label>
                  <textarea name="descricao" value={form.descricao} onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="campo">
                  <label>ISBN</label>
                  <input type="text" name="isbn" value={form.isbn} onChange={handleChange} />
                </div>
              </div>

              <button type="submit" className="btn-salvar">
                {modoEdicao ? 'Salvar Alterações' : 'Salvar no Banco'}
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="rodape">
        Sistema de Livraria © 2026 | Desenvolvido com tecnologia Spring Boot + React
      </footer>
    </div>
  );
}

export default App;