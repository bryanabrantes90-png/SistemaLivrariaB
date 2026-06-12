import axios from 'axios'

const API_URL = 'http://localhost:8082/api/usuarios'

export async function login(email, senha) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, senha })
    localStorage.setItem('usuarioLogado', JSON.stringify(res.data))
    return { sucesso: true, dados: res.data }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.response?.data || 'Erro ao fazer login' }
  }
}

export function logout() {
  localStorage.removeItem('usuarioLogado')
}

export function getUsuarioLogado() {
  const dados = localStorage.getItem('usuarioLogado')
  return dados ? JSON.parse(dados) : null
}

export async function listarUsuarios() {
  const res = await axios.get(API_URL)
  return res.data
}

export async function buscarUsuarioPorId(id) {
  const res = await axios.get(`${API_URL}/${id}`)
  return res.data
}

export async function cadastrarUsuario(dados) {
  try {
    const res = await axios.post(API_URL, dados)
    return { sucesso: true, dados: res.data }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.response?.data || 'Erro ao cadastrar' }
  }
}

export async function atualizarUsuario(id, dados) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, dados)
    return { sucesso: true, dados: res.data }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.response?.data || 'Erro ao atualizar' }
  }
}

export async function excluirUsuario(id) {
  try {
    await axios.delete(`${API_URL}/${id}`)
    return { sucesso: true }
  } catch (erro) {
    return { sucesso: false, mensagem: erro.response?.data || 'Erro ao excluir' }
  }
}