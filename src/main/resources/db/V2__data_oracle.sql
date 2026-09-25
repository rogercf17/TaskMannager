INSERT INTO usuarios (id, nome, email)
VALUES (usuario_seq.NEXTVAL, 'João Silva', 'joao@email.com');

INSERT INTO tarefas (
    id, titulo, descricao, status, data_criacao, data_limite, usuario_id, prioridade
) VALUES (
    tarefa_seq.NEXTVAL,
    'Estudar Spring Boot',
    'Criar API REST completa',
    'PENDENTE',
    SYSDATE,
    SYSDATE + 7,
    1,
    'ALTA'
);
