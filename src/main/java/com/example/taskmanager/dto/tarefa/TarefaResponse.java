package com.example.taskmanager.dto.tarefa;

import com.example.taskmanager.model.PrioridadeTarefa;
import com.example.taskmanager.model.StatusTarefa;
import com.example.taskmanager.model.Usuario;
import java.time.LocalDate;

public record TarefaResponse(
    Long id,
    String titulo,
    String descricao,
    StatusTarefa status,
    LocalDate dataCriacao,
    LocalDate dataLimite,
    Usuario usuario,
    PrioridadeTarefa prioridade
) { }
