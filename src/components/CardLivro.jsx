import capaPadrao from "../assets/image.png";

export default function CardLivro({ livro, onEditar, onExcluir }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "1.2rem",
      marginBottom: "1.2rem",
      backgroundColor: "#f8fafc",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      <img
        src={capaPadrao}
        alt={`Capa de ${livro.titulo}`}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "1rem"
        }}
      />

      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#0f172a", margin: "0 0 0.5rem 0" }}>
        {livro.titulo}
      </h3>

      <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "0 0 0.3rem 0" }}>
        ✍️ Autor: {livro.autor_nome || "Não informado"}
      </p>

      <p style={{ fontSize: "0.95rem", color: "#64748b", margin: "0 0 0.8rem 0" }}>
        🗂️ Categoria: {livro.categoria_nome || "Não informada"}
      </p>

      <p style={{ fontSize: "0.95rem", color: "#475569", margin: "0 0 1rem 0", lineHeight: "1.5" }}>
        {livro.descricao || "Sem descrição."}
      </p>

      <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", textAlign: "right", margin: "0 0 1rem 0" }}>
        R$ {Number(livro.preco).toFixed(2)}
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={onEditar} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>✏️ Editar</button>
        <button onClick={onExcluir} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: 500 }}>🗑️ Excluir</button>
      </div>
    </div>
  );
}