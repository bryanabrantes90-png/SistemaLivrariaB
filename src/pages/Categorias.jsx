/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

// Aqui depois você vai importar a API quando criar as rotas
// import { listarCategorias, salvarCategoria, atualizarCategoria, excluirCategoria } from "../services/api";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [busca, setBusca] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({ id: null, nome: "", descricao: "" });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  // Simulação de carregamento — substitua pela API depois
  useEffect(() => {
    // const carregar = async () => {
    //   const dados = await listarCategorias();
    //   setCategorias(dados);
    // };
    // carregar();
  }, []);

  useEffect(() => {
    if (!busca.trim()) {
      setCategoriasFiltradas(categorias);
      return;
    }
    const termo = busca.toLowerCase().trim();
    const resultado = categorias.filter(cat =>
      cat.nome.toLowerCase().includes(termo)
    );
    setCategoriasFiltradas(resultado);
  }, [busca, categorias]);

  const limparFormulario = () => {
    setForm({ id: null, nome: "", descricao: "" });
    setModoEdicao(false);
    setMensagem("");
    setTipoMensagem("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    if (!form.nome.trim()) {
      setMensagem("❌ O nome da categoria é obrigatório.");
      setTipoMensagem("erro");
      return;
    }

    try {
      if (modoEdicao) {
        // await atualizarCategoria(form.id, { nome: form.nome, descricao: form.descricao });
        setMensagem("✅ Categoria atualizada com sucesso!");
      } else {
        // await salvarCategoria({ nome: form.nome, descricao: form.descricao });
        setMensagem("✅ Categoria cadastrada com sucesso!");
      }
      setTipoMensagem("sucesso");
      limparFormulario();
      // carregar();
    } catch (err) {
      setMensagem("❌ Erro ao salvar a categoria.");
      setTipoMensagem("erro");
    }
  };

  const editar = (categoria) => {
    setForm({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao || ""
    });
    setModoEdicao(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      // await excluirCategoria(id);
      setMensagem("🗑️ Categoria excluída com sucesso!");
      setTipoMensagem("sucesso");
      // carregar();
    } catch (err) {
      setMensagem("❌ Erro ao excluir.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{
        fontSize: "2rem",
        color: "#0f172a",
        marginBottom: "1.5rem",
        fontWeight: 700,
        textAlign: "center"
      }}>
        🗂️ Gerenciamento de Categorias
      </h2>

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

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2.5rem"
      }}>
        {/* Formulário */}
        <section style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#0f172a",
            margin: "0 0 1.5rem 0",
            paddingBottom: "0.8rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            {modoEdicao ? "Editar Categoria" : "Cadastrar Nova Categoria"}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Nome da Categoria
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Ficção, Romance, Técnico..."
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "1rem"
                }}
              />
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
                placeholder="Detalhes sobre a categoria..."
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
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
            >
              {modoEdicao ? "Salvar Alterações" : "Salvar Categoria"}
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

        {/* Lista e Busca */}
        <section style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#0f172a",
            margin: "0 0 1.5rem 0",
            paddingBottom: "0.8rem",
            borderBottom: "1px solid #f1f5f9"
          }}>
            Lista de Categorias
          </h3>

          <input
            type="text"
            placeholder="🔍 Buscar por nome..."
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

          {categoriasFiltradas.length === 0 ? (
            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#94a3b8", fontSize: "1.1rem" }}>
              {busca ? "Nenhuma categoria encontrada." : "Nenhuma categoria cadastrada ainda."}
            </div>
          ) : (
            <div style={{ maxHeight: "600px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {categoriasFiltradas.map(cat => (
                <div key={cat.id} style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.2rem",
                  marginBottom: "1rem",
                  backgroundColor: "#f8fafc"
                }}>
                  <h4 style={{ fontSize: "1.1rem", margin: "0 0 0.5rem 0", color: "#0f172a" }}>{cat.nome}</h4>
                  <p style={{ fontSize: "0.95rem", color: "#475569", margin: "0 0 1rem 0" }}>{cat.descricao || "Sem descrição."}</p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => editar(cat)} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>✏️ Editar</button>
                    <button onClick={() => excluir(cat.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: 500 }}>🗑️ Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}