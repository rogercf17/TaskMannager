package com.example.taskmanager.service;

import com.example.taskmanager.dto.usuario.UsuarioMapper;
import com.example.taskmanager.dto.usuario.UsuarioRequest;
import com.example.taskmanager.dto.usuario.UsuarioResponse;
import com.example.taskmanager.exception.NaoEncontradoException;
import com.example.taskmanager.model.Usuario;
import com.example.taskmanager.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import static java.util.stream.Collectors.toList;

@Service
public class UsuarioService {
    private final UsuarioRepository repo;
    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public List<UsuarioResponse> listar() {
        return repo.findAll().stream()
                .map(UsuarioMapper::toResponse)
                .collect(toList());
    }

    public UsuarioResponse buscarPorId(Long id) {
        return repo.findById(id)
                .map(usuario -> UsuarioMapper.toResponse(usuario))
                .orElseThrow(() -> new NaoEncontradoException("Usuário de ID "+id+" não encontrado."));
    }

    @Transactional
    public UsuarioResponse criar(UsuarioRequest request) {
        return UsuarioMapper.toResponse(repo.save(UsuarioMapper.toEntity(request)));
    }
    @Transactional
    public UsuarioResponse atualizar(UsuarioRequest request, Long id) {
        return repo.findById(id)
                .map(usuario -> {
                    usuario.setNome(request.nome());
                    usuario.setEmail(request.email());

                    Usuario atualizado = repo.save(usuario);
                    return UsuarioMapper.toResponse(atualizado);
                })
                .orElseThrow(() -> new NaoEncontradoException("Usuário de ID "+id+" não encontrado."));
    }
    @Transactional
    public void deletar(Long id) {
        repo.deleteById(id);
    }
}
