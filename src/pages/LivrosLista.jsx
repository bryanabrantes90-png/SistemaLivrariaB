/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { listarLivros, salvarLivro, atualizarLivro, excluirLivro, listarAutores, listarCategorias } from "../services/api";
import CardLivro from "../components/CardLivro";

export default function LivrosLista() {
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    descricao: "",
    preco: "",
    autor_id: "",
    categoria_id: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    filtrarLivros();
  }, [busca, livros]);

  const carregarDados = async () => {
    try {
      const dadosLivros = await listarLivros();
      const dadosAutores = await listarAutores();
      const dadosCategorias = await listarCategorias();
      setLivros(dadosLivros);
      setAutores(dadosAutores);
      setCategorias(dadosCategorias);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setMensagem("❌ Não foi possível conectar ao servidor.");
      setTipoMensagem("erro");
    }
  };

  const filtrarLivros = () => {
    if (!busca.trim()) {
      setLivrosFiltrados(livros);
      return;
    }
    const termo = busca.toLowerCase().trim();
    const resultado = livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor_nome?.toLowerCase().includes(termo) ||
      livro.categoria_nome?.toLowerCase().includes(termo)
    );
    setLivrosFiltrados(resultado);
  };

  const limparFormulario = () => {
    setForm({ id: null, titulo: "", descricao: "", preco: "", autor_id: "", categoria_id: "" });
    setModoEdicao(false);
    setMensagem("");
    setTipoMensagem("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    if (!form.titulo.trim()) {
      setMensagem("❌ Título é obrigatório.");
      setTipoMensagem("erro");
      return;
    }

    const precoNum = parseFloat(form.preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      setMensagem("❌ Preço deve ser um valor maior que zero.");
      setTipoMensagem("erro");
      return;
    }

    const dadosEnvio = {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      preco: precoNum,
      autor_id: form.autor_id || null,
      categoria_id: form.categoria_id || null
    };

    try {
      if (modoEdicao) {
        await atualizarLivro(form.id, dadosEnvio);
        setMensagem("✅ Livro atualizado com sucesso!");
      } else {
        await salvarLivro(dadosEnvio);
        setMensagem("✅ Livro cadastrado com sucesso!");
      }
      setTipoMensagem("sucesso");
      limparFormulario();
      carregarDados();
    } catch (err) {
      console.error("Erro:", err);
      setMensagem("❌ Não foi possível salvar. Verifique os dados.");
      setTipoMensagem("erro");
    }
  };

  const editarLivro = (livro) => {
    setForm({
      id: livro.id,
      titulo: livro.titulo,
      descricao: livro.descricao || "",
      preco: livro.preco,
      autor_id: livro.autor_id || "",
      categoria_id: livro.categoria_id || ""
    });
    setModoEdicao(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await excluirLivro(id);
      setMensagem("🗑️ Livro excluído com sucesso!");
      setTipoMensagem("sucesso");
      carregarDados();
    } catch (err) {
      setMensagem("❌ Erro ao excluir.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {mensagem && (
        <div style={{
          padding: "1rem",
          marginBottom: "1.5rem",
          borderRadius: "6px",
          textAlign: "center",
          fontWeight: 500,
          backgroundColor: tipoMensagem === "sucesso" ? "#ecfccb" : "#fee2e2",
          color: tipoMensagem === "sucesso" ? "#3f6212" : "#991b1b",
          border: `1px solid ${tipoMensagem === "sucesso" ? "#d9f99d" : "#fecaca"}`
        }}>
          {mensagem}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
        {/* Formulário */}
        <section style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#0f172a",
            margin: "0 0 1.5rem 0",
            paddingBottom: "0.8rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            {modoEdicao ? "Editar Livro" : "Cadastrar Novo Livro"}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Título do Livro
              </label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem"
                }}
              />
            </div>

            {/* Campo de seleção de Autor */}
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Autor
              </label>
              <select
                name="autor_id"
                value={form.autor_id}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  backgroundColor: "#fff"
                }}
              >
                <option value="">Selecione um autor</option>
                {autores.map(autor => (
                  <option key={autor.id} value={autor.id}>{autor.nome}</option>
                ))}
              </select>
            </div>

            {/* Campo de seleção de Categoria */}
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Categoria
              </label>
              <select
                name="categoria_id"
                value={form.categoria_id}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  backgroundColor: "#fff"
                }}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Descrição
              </label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  resize: "none"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Preço R$
              </label>
              <input
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "1rem",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1.05rem",
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              {modoEdicao ? "Salvar Alterações" : "Salvar Livro"}
            </button>

            {modoEdicao && (
              <button
                type="button"
                onClick={limparFormulario}
                style={{
                  padding: "1rem",
                  backgroundColor: "#64748b",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            )}
          </form>
        </section>

        {/* Lista de Livros */}
        <section style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#0f172a",
            margin: "0 0 1.5rem 0",
            paddingBottom: "0.8rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            Lista de Livros
          </h2>

          <input
            type="text"
            placeholder="🔍 Buscar por título, autor ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem 1.2rem",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "1rem",
              marginBottom: "1.5rem"
            }}
          />

          {livrosFiltrados.length === 0 ? (
            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#94a3b8" }}>
              {busca ? "Nenhum livro encontrado." : "Nenhum livro cadastrado."}
            </div>
          ) : (
            <div style={{ maxHeight: "700px", overflowY: "auto" }}>
              {livrosFiltrados.map(livro => (
                <CardLivro
                  key={livro.id}
                  livro={livro}
                  onEditar={() => editarLivro(livro)}
                  onExcluir={() => handleExcluir(livro.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}