package com.example.taskmanager.dto.usuario;

public record UsuarioResponse(
        Long id,
        String nome,
        String email
) { }
