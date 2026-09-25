package com.example.taskmanager.service;

import com.example.taskmanager.dto.tarefa.TarefaMapper;
import com.example.taskmanager.dto.tarefa.TarefaRequest;
import com.example.taskmanager.dto.tarefa.TarefaResponse;
import com.example.taskmanager.exception.NaoEncontradoException;
import com.example.taskmanager.model.StatusTarefa;
import com.example.taskmanager.model.Tarefa;
import com.example.taskmanager.model.Usuario;
import com.example.taskmanager.repository.TarefaRepository;
import com.example.taskmanager.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import static java.util.stream.Collectors.toList;

@Service
public class TarefaService {
    private final TarefaRepository repo;
    private final UsuarioRepository usuarioRepository;
    public TarefaService(TarefaRepository repo, UsuarioRepository usuarioRepository) {
        this.repo = repo;
        this.usuarioRepository = usuarioRepository;
    }

    public List<TarefaResponse> listar() {
        return repo.findAll().stream()
                .map(TarefaMapper::toResponse)
                .collect(toList());
    }
    public TarefaResponse buscarPorId(Long id) {
        return repo.findById(id)
                .map(tarefa -> TarefaMapper.toResponse(tarefa))
                .orElseThrow(() -> new NaoEncontradoException("Tarefa de id "+ id +" não encontrada."));
    }

    @Transactional
    public TarefaResponse criar(TarefaRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new NaoEncontradoException("Usuário de id "+ request.usuarioId() +" não encontrado."));

        Tarefa tarefa = TarefaMapper.toEntity(request);
        tarefa.setUsuario(usuario);

        return TarefaMapper.toResponse(repo.save(tarefa));
    }
    @Transactional
    public TarefaResponse atualizar(TarefaRequest request, Long id) {
        return repo.findById(id)
                .map(tarefa -> {
                    Usuario usuario = usuarioRepository.findById(request.usuarioId())
                                    .orElseThrow(() -> new NaoEncontradoException("Usuário de id "+ request.usuarioId() +" não encontrado."));

                    tarefa.setTitulo(request.titulo());
                    tarefa.setDescricao(request.descricao());
                    tarefa.setStatus(request.status());
                    tarefa.setDataCriacao(request.dataCriacao());
                    tarefa.setDataLimite(request.dataLimite());
                    tarefa.setUsuario(usuario);
                    tarefa.setPrioridade(request.prioridade());

                    Tarefa atualizada = repo.save(tarefa);
                    return TarefaMapper.toResponse(atualizada);
                })
                .orElseThrow(() -> new NaoEncontradoException("Tarefa de id "+ id +" não encontrada."));
    }
    @Transactional
    public void deletar(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public TarefaResponse atualizarStatus(Long id, StatusTarefa novoStatus) {
        Tarefa tarefa = repo.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Tarefa de id "+ id +" não encontrada."));

        tarefa.setStatus(novoStatus);

        return TarefaMapper.toResponse(tarefa);
    }
}
