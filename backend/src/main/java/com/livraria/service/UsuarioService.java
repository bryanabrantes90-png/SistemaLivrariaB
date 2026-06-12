package com.livraria.service;

import com.livraria.dto.UsuarioDTO;
import com.livraria.model.Usuario;
import com.livraria.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private UsuarioDTO converterParaDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setEndereco(usuario.getEndereco());
        dto.setTipo(usuario.getTipo());
        dto.setAtivo(usuario.getAtivo());
        return dto;
    }

    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll().stream().map(this::converterParaDTO).collect(Collectors.toList());
    }

    public UsuarioDTO buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return converterParaDTO(usuario);
    }

    public Usuario cadastrar(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) throw new RuntimeException("E-mail já cadastrado");
        return usuarioRepository.save(usuario);
    }

    public UsuarioDTO atualizar(Long id, Usuario dados) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setNome(dados.getNome());
        usuario.setTelefone(dados.getTelefone());
        usuario.setEndereco(dados.getEndereco());
        usuario.setTipo(dados.getTipo());
        usuario.setAtivo(dados.getAtivo());
        if (!usuario.getEmail().equals(dados.getEmail())) {
            if (usuarioRepository.existsByEmail(dados.getEmail())) throw new RuntimeException("E-mail já cadastrado");
            usuario.setEmail(dados.getEmail());
        }
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) usuario.setSenha(dados.getSenha());
        return converterParaDTO(usuarioRepository.save(usuario));
    }

    public void excluir(Long id) {
        if (!usuarioRepository.existsById(id)) throw new RuntimeException("Usuário não encontrado");
        usuarioRepository.deleteById(id);
    }

    public UsuarioDTO login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("E-mail ou senha inválidos"));
        if (!usuario.getSenha().equals(senha)) throw new RuntimeException("E-mail ou senha inválidos");
        if (!usuario.getAtivo()) throw new RuntimeException("Usuário inativo");
        return converterParaDTO(usuario);
    }
}