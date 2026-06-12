const API_URL = "http://localhost:8083/api/livros";

// Função para cadastrar
export const cadastrarLivro = async (dadosLivro) => {
  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: dadosLivro.titulo,
        autor: dadosLivro.autor,
        preco: parseFloat(dadosLivro.preco),
        quantidadeEstoque: parseInt(dadosLivro.quantidade),
        descricao: dadosLivro.descricao || "",
        isbn: dadosLivro.isbn || "",
        dataCadastro: new Date().toISOString().split('T')[0] // data de hoje
      }),
    });
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
  }
};