package com.example.taskmanager.dto.usuario;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioRequest(
    @NotBlank(message = "O nome é obrigatório!")
    @Column(name = "nome", length = 100, nullable = false)
    String nome,

    @Email(message = "Formato de e-mail inválido.")
    @NotBlank(message = "O Email é orbigatório")
    @Column(name = "email", length = 100, unique = true, nullable = false)
    String email
) { }
