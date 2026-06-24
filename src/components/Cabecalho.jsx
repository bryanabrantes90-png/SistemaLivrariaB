import { Link } from "react-router-dom";
import logo from "../assets/image.svg";

export default function Cabecalho() {
  return (
    <header style={{
      backgroundColor: "#1e293b",
      color: "white",
      padding: "1.2rem 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <img src={logo} alt="Logo Livraria" width="42" height="42" />
          <h1 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 600 }}>Sistema Livraria</h1>
        </div>

        <nav style={{ display: "flex", gap: "1.8rem" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.2s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => e.target.style.opacity = "0.8"}
            onMouseOut={(e) => e.target.style.opacity = "1"}
          >
            Início
          </Link>
          <Link
            to="/livros"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.2s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => e.target.style.opacity = "0.8"}
            onMouseOut={(e) => e.target.style.opacity = "1"}
          >
            Livros
          </Link>
          <Link
            to="/autores"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.2s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => e.target.style.opacity = "0.8"}
            onMouseOut={(e) => e.target.style.opacity = "1"}
          >
            Autores
          </Link>
          <Link
            to="/categorias"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.2s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => e.target.style.opacity = "0.8"}
            onMouseOut={(e) => e.target.style.opacity = "1"}
          >
            Categorias
          </Link>
        </nav>
      </div>
    </header>
  );
}