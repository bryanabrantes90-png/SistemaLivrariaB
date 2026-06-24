/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

// import { listarAutores, salvarAutor, atualizarAutor, excluirAutor } from "../services/api";

export default function Autores() {
  const [autores, setAutores] = useState([]);
  const [autoresFiltrados, setAutoresFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({ id: null, nome: "", biografia: "", nacionalidade: "" });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  useEffect(() => {
    // const carregar = async () => {
    //   const dados = await listarAutores();
    //   setAutores(dados);
    // };
    // carregar();
  }, []);

  useEffect(() => {
    if (!busca.trim()) {
      setAutoresFiltrados(autores);
      return;
    }
    const termo = busca.toLowerCase().trim();
    const resultado = autores.filter(autor =>
      autor.nome.toLowerCase().includes(termo)
    );
    setAutoresFiltrados(resultado);
  }, [busca, autores]);

  const limparFormulario = () => {
    setForm({ id: null, nome: "", biografia: "", nacionalidade: "" });
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
      setMensagem("❌ O nome do autor é obrigatório.");
      setTipoMensagem("erro");
      return;
    }

    try {
      if (modoEdicao) {
        // await atualizarAutor(form.id, { nome: form.nome, biografia: form.biografia, nacionalidade: form.nacionalidade });
        setMensagem("✅ Autor atualizado com sucesso!");
      } else {
        // await salvarAutor({ nome: form.nome, biografia: form.biografia, nacionalidade: form.nacionalidade });
        setMensagem("✅ Autor cadastrado com sucesso!");
      }
      setTipoMensagem("sucesso");
      limparFormulario();
      // carregar();
    } catch (err) {
      setMensagem("❌ Erro ao salvar o autor.");
      setTipoMensagem("erro");
    }
  };

  const editar = (autor) => {
    setForm({
      id: autor.id,
      nome: autor.nome,
      biografia: autor.biografia || "",
      nacionalidade: autor.nacionalidade || ""
    });
    setModoEdicao(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluir = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      // await excluirAutor(id);
      setMensagem("🗑️ Autor excluído com sucesso!");
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
        ✍️ Gerenciamento de Autores
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
            {modoEdicao ? "Editar Autor" : "Cadastrar Novo Autor"}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem", color: "#334155" }}>
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Éliphas Lévi"
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
                Nacionalidade
              </label>
              <input
                type="text"
                name="nacionalidade"
                value={form.nacionalidade}
                onChange={handleChange}
                placeholder="Ex: Francês, Brasileiro..."
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
                Biografia
              </label>
              <textarea
                name="biografia"
                value={form.biografia}
                onChange={handleChange}
                rows="4"
                placeholder="Resumo da vida e obra do autor..."
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
              {modoEdicao ? "Salvar Alterações" : "Salvar Autor"}
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
            Lista de Autores
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

          {autoresFiltrados.length === 0 ? (
            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#94a3b8", fontSize: "1.1rem" }}>
              {busca ? "Nenhum autor encontrado." : "Nenhum autor cadastrado ainda."}
            </div>
          ) : (
            <div style={{ maxHeight: "600px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {autoresFiltrados.map(autor => (
                <div key={autor.id} style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "1.2rem",
                  marginBottom: "1rem",
                  backgroundColor: "#f8fafc"
                }}>
                  <h4 style={{ fontSize: "1.1rem", margin: "0 0 0.3rem 0", color: "#0f172a" }}>{autor.nome}</h4>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 0.5rem 0" }}>{autor.nacionalidade || "Nacionalidade não informada"}</p>
                  <p style={{ fontSize: "0.95rem", color: "#475569", margin: "0 0 1rem 0" }}>{autor.biografia || "Sem biografia cadastrada."}</p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => editar(autor)} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>✏️ Editar</button>
                    <button onClick={() => excluir(autor.id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: 500 }}>🗑️ Excluir</button>
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