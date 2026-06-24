import axios from "axios";

// Lê a URL do arquivo .env
const API_URL = import.meta.env.VITE_API_URL;

console.log("🔗 Conectando à API:", API_URL); // para verificar no console

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 8000
});

// Tratamento de erros detalhado
api.interceptors.response.use(
  res => res,
  err => {
    console.error("❌ Erro na requisição:");
    console.error("→ Status:", err.response?.status);
    console.error("→ Mensagem:", err.message);
    console.error("→ Resposta:", err.response?.data);
    return Promise.reject(err);
  }
);

// 📚 Livros
export const listarLivros = () => api.get("/livros").then(r => r.data);
export const salvarLivro = (dados) => api.post("/livros", dados).then(r => r.data);
export const atualizarLivro = (id, dados) => api.put(`/livros/${id}`, dados).then(r => r.data);
export const excluirLivro = (id) => api.delete(`/livros/${id}`);

// ✍️ Autores
export const listarAutores = () => api.get("/autores").then(r => r.data);
export const salvarAutor = (dados) => api.post("/autores", dados).then(r => r.data);
export const atualizarAutor = (id, dados) => api.put(`/autores/${id}`, dados).then(r => r.data);
export const excluirAutor = (id) => api.delete(`/autores/${id}`);

// 🗂️ Categorias
export const listarCategorias = () => api.get("/categorias").then(r => r.data);
export const salvarCategoria = (dados) => api.post("/categorias", dados).then(r => r.data);
export const atualizarCategoria = (id, dados) => api.put(`/categorias/${id}`, dados).then(r => r.data);
export const excluirCategoria = (id) => api.delete(`/categorias/${id}`);

export default api;