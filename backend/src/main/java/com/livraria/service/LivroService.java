package com.livraria.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.livraria.dto.LivroDTO;
import com.livraria.model.Livro;
import com.livraria.repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    private LivroDTO converterParaDTO(Livro livro) {
        LivroDTO dto = new LivroDTO();
        dto.setId(livro.getId());
        dto.setTitulo(livro.getTitulo());
        dto.setAutor(livro.getAutor());
        dto.setPreco(livro.getPreco());
        dto.setQuantidadeEstoque(livro.getQuantidadeEstoque());
        dto.setNomeImagem(livro.getNomeImagem());
        dto.setDescricao(livro.getDescricao());
        dto.setIsbn(livro.getIsbn());
        return dto;
    }

    public List<LivroDTO> listarTodos() {
        return livroRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public LivroDTO buscarPorId(Long id) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
        return converterParaDTO(livro);
    }

    public Livro cadastrar(Livro livro) {
        return livroRepository.save(livro);
    }

    public LivroDTO atualizar(Long id, Livro dadosAtualizados) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        livro.setTitulo(dadosAtualizados.getTitulo());
        livro.setAutor(dadosAtualizados.getAutor());
        livro.setPreco(dadosAtualizados.getPreco());
        livro.setQuantidadeEstoque(dadosAtualizados.getQuantidadeEstoque());
        livro.setNomeImagem(dadosAtualizados.getNomeImagem());
        livro.setDescricao(dadosAtualizados.getDescricao());
        livro.setIsbn(dadosAtualizados.getIsbn());

        return converterParaDTO(livroRepository.save(livro));
    }

    public void excluir(Long id) {
        if (!livroRepository.existsById(id)) {
            throw new RuntimeException("Livro não encontrado");
        }
        livroRepository.deleteById(id);
    }
}