export default function Inicio() {
  return (
    <div style={{
      minHeight: "calc(100vh - 160px)",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "4rem 2rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>

      {/* Cabeçalho da página */}
      <h2 style={{
        fontSize: "2.5rem",
        color: "#0f172a",
        marginBottom: "1.5rem",
        fontWeight: 700,
        lineHeight: "1.2"
      }}>
        📚 Bem-vindo ao Sistema de Livraria
      </h2>

      <p style={{
        fontSize: "1.2rem",
        color: "#475569",
        maxWidth: "750px",
        margin: "0 auto 3rem auto",
        lineHeight: "1.7"
      }}>
        Gerencie seu acervo de livros de forma simples, rápida e profissional. Cadastre, edite, exclua e encontre qualquer livro em segundos.
      </p>

      {/* Seção de funcionalidades */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem"
      }}>
        <div style={{
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0"
        }}>
          <h3 style={{ fontSize: "1.3rem", color: "#2563eb", marginBottom: "1rem" }}>📝 Cadastro</h3>
          <p style={{ color: "#475569" }}>Adicione novos livros com todas as informações de forma organizada.</p>
        </div>

        <div style={{
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0"
        }}>
          <h3 style={{ fontSize: "1.3rem", color: "#2563eb", marginBottom: "1rem" }}>✏️ Edição</h3>
          <p style={{ color: "#475569" }}>Atualize dados de livros já cadastrados sempre que precisar.</p>
        </div>

        <div style={{
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0"
        }}>
          <h3 style={{ fontSize: "1.3rem", color: "#2563eb", marginBottom: "1rem" }}>🔍 Busca</h3>
          <p style={{ color: "#475569" }}>Encontre rapidamente qualquer livro por título ou autor.</p>
        </div>
      </div>

      {/* Botão de chamada para ação */}
      <a
        href="/livros"
        style={{
          display: "inline-block",
          padding: "1rem 2.5rem",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1.1rem",
          fontWeight: 500,
          transition: "background-color 0.2s",
          width: "fit-content",
          margin: "0 auto"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
      >
        Começar a usar
      </a>
    </div>
  );
}