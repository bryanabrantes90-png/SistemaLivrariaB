import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cabecalho from "./components/Cabecalho";
import Rodape from "./components/Rodape";
import Inicio from "./pages/Inicio";
import LivrosLista from "./pages/LivrosLista";
import Autores from "./pages/Autores";
import Categorias from "./pages/Categorias";
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
        <Cabecalho />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/livros" element={<LivrosLista />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </main>
        <Rodape />
      </div>
    </Router>
  );
}

export default App;