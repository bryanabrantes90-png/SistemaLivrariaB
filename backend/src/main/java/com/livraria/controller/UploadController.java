package com.livraria.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    @Value("${livraria.upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("arquivo") MultipartFile arquivo) {
        if (arquivo.isEmpty()) return ResponseEntity.badRequest().body("Arquivo vazio");

        try {
            File diretorio = new File(uploadDir);
            if (!diretorio.exists()) diretorio.mkdirs();

            String nomeUnico = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();
            File destino = new File(diretorio, nomeUnico);
            arquivo.transferTo(destino);

            return ResponseEntity.ok(nomeUnico);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao enviar: " + e.getMessage());
        }
    }
}