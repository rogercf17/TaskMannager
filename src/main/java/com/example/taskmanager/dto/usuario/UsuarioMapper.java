package com.example.taskmanager.dto.usuario;

import com.example.taskmanager.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {
    public static Usuario toEntity(UsuarioRequest request) {
        Usuario u = new Usuario();
        u.setNome(request.nome());
        u.setEmail(request.email());
        return u;
    }

    public static UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail()
        );
    }
}
