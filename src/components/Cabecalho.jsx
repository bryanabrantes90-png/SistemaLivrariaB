import { Link } from "react-router-dom";
import logo from "../assets/image.svg";
export default function Cabecalho() {
  return (
    <header style={{ background: "#2c3e50", color: "white", padding: "1rem 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <img src={logo} alt="Logo Livraria" width="40" height="40" />
          <h1 style={{ fontSize: "1.3rem", margin: 0 }}>Sistema Livraria</h1>
        </div>
        <nav>
          <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Início</Link>
          <Link to="/livros" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Livros</Link>
          <Link to="/autores" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Autores</Link>
          <Link to="/categorias" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>Categorias</Link>
        </nav>
      </div>
    </header>
  );
}