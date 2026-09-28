package com.example.taskmanager.controller;

import com.example.taskmanager.dto.tarefa.TarefaRequest;
import com.example.taskmanager.dto.tarefa.TarefaResponse;
import com.example.taskmanager.dto.tarefa.TarefaStatusDTO;
import com.example.taskmanager.model.Tarefa;
import com.example.taskmanager.service.TarefaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@CrossOrigin(origins = "https://task-manager-coral-theta-51.vercel.app/")
public class TarefaController {
    private final TarefaService service;
    public TarefaController(TarefaService service) {
        this.service = service;
    }

    @GetMapping
    public List<TarefaResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<TarefaResponse> criar(@Valid @RequestBody TarefaRequest request) {
        TarefaResponse salva = service.criar(request);
        URI location = URI.create("/api/tarefas/"+ salva.id());
        return ResponseEntity.created(location).body(salva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponse> atualizar(@Valid @RequestBody TarefaRequest request,
                                                    @PathVariable Long id) {
        return ResponseEntity.ok(service.atualizar(request, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<TarefaResponse> atualizarStatus(@PathVariable Long id,
                                                  @RequestBody TarefaStatusDTO dto) {
        return ResponseEntity.ok(
                service.atualizarStatus(id, dto.getStatus())
        );
    }
}
