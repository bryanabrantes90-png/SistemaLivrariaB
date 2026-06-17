// 🔹 URL do BACKEND que está no Railway — COLOQUE A SUA URL A BAIXO
// Exemplo: "https://sistemalivraria-backend-production.up.railway.app/api/livros"
// Para teste local
// ✅ AGORA USA O ENDEREÇO DO RAILWAY
const API_URL = "https://sistemalivraria-backend-production.up.railway.app/api/livros";

// Depois troca para nuvem:
// const API_URL = "https://sistemalivraria-backend-production.up.railway.app/api/livros";

// Funções de conexão
export async function listarLivros() {
  const resposta = await fetch(API_URL);
  if (!resposta.ok) throw new Error("Erro ao buscar livros");
  return resposta.json();
}

export async function salvarLivro(livro) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  });
  if (!resposta.ok) throw new Error("Erro ao cadastrar");
  return resposta.json();
}

export async function atualizarLivro(id, livro) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro)
  });
  if (!resposta.ok) throw new Error("Erro ao atualizar");
  return resposta.json();
}

export async function excluirLivro(id) {
  const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error("Erro ao excluir");
}