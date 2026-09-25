package com.example.taskmanager.dto.tarefa;

import com.example.taskmanager.model.StatusTarefa;

public class TarefaStatusDTO {
    private StatusTarefa status;

    public StatusTarefa getStatus() {
        return status;
    }

    public void setStatus(StatusTarefa status) {
        this.status = status;
    }
}
