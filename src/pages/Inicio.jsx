import { Link } from "react-router-dom";
import hero from "../assets/image.svg";
export default function Inicio() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <img 
        src={hero} 
        alt="Livraria" 
        style={{ maxWidth: "400px", marginBottom: "2rem" }} 
      />
      <h2>Bem-vindo ao Sistema de Gerenciamento de Livraria</h2>
      <p style={{ maxWidth: "700px", margin: "1rem auto", fontSize: "1.1rem" }}>
        Gerencie seu acervo, cadastre livros, autores e categorias de forma simples e rápida.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <Link to="/livros/cadastrar" className="btn btn-success" style={{ marginRight: "1rem" }}>
          Cadastrar Livro
        </Link>
        <Link to="/livros" className="btn btn-primary">
          Ver Acervo
        </Link>
      </div>
    </div>
  );
}