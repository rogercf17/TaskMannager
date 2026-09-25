package com.example.taskmanager.dto.tarefa;

import com.example.taskmanager.model.PrioridadeTarefa;
import com.example.taskmanager.model.StatusTarefa;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TarefaRequest(
    @NotBlank(message = "O Título é obrigatório")
    @Column(name = "titulo", length = 100, nullable = false)
    String titulo,

    @NotBlank(message = "A Descrição é obrigatória")
    @Column(name = "descricao", length = 150, nullable = false)
    String descricao,

    StatusTarefa status,

    @NotNull(message = "A data de criação é obrigatória.") @Column(name = "data_criacao", nullable = false)
    LocalDate dataCriacao,

    @NotNull(message = "A data limite é obrigatória.") @Column(name = "data_limite", nullable = false)
    LocalDate dataLimite,

    @NotNull(message = "O id do usuário é obrigatório.") @Column(name = "usuario", nullable = false)
    Long usuarioId,

    @NotNull(message = "A prioridade é obrigatória.") @Column(name = "prioridade", nullable = false)
    PrioridadeTarefa prioridade
) { }
