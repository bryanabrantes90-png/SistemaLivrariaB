const API_URL = "https://sistemalivraria-backend-production.up.railway.app/api/livros";

// Salvar novo livro
export const salvarLivro = async (dados) => {
  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: dados.titulo,
        autor: dados.autor,
        preco: parseFloat(dados.preco),
        quantidadeEstoque: parseInt(dados.quantidade),
        descricao: dados.descricao || "",
        isbn: dados.isbn || "",
        dataCadastro: new Date().toISOString().split('T')[0]
      })
    });
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
    throw erro;
  }
};

// Listar todos
export const listarLivros = async () => {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Erro na requisição");
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao carregar:", erro);
    return [];
  }
};

// ✅ ATUALIZAR LIVRO
export const atualizarLivro = async (id, dados) => {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: dados.titulo,
        autor: dados.autor,
        preco: parseFloat(dados.preco),
        quantidadeEstoque: parseInt(dados.quantidade),
        descricao: dados.descricao || "",
        isbn: dados.isbn || ""
      })
    });
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    throw erro;
  }
};

// ✅ EXCLUIR LIVRO
export const excluirLivro = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    throw erro;
  }
};