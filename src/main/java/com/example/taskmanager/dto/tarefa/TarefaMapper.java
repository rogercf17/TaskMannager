package com.example.taskmanager.dto.tarefa;

import com.example.taskmanager.model.Tarefa;
import org.springframework.stereotype.Component;

@Component
public class TarefaMapper {
    public static Tarefa toEntity(TarefaRequest request) {
        Tarefa t = new Tarefa();
        t.setTitulo(request.titulo());
        t.setDescricao(request.descricao());
        t.setStatus(request.status());
        t.setDataCriacao(request.dataCriacao());
        t.setDataLimite(request.dataLimite());
        t.setPrioridade(request.prioridade());
        return t;
    }

    public static TarefaResponse toResponse(Tarefa tarefa) {
        return new TarefaResponse(
                tarefa.getId(),
                tarefa.getTitulo(),
                tarefa.getDescricao(),
                tarefa.getStatus(),
                tarefa.getDataCriacao(),
                tarefa.getDataLimite(),
                tarefa.getUsuario(),
                tarefa.getPrioridade()
        );
    }
}
