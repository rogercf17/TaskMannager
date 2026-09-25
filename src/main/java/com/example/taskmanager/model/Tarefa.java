package com.example.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "tarefas")
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tarefa_seq")
    @SequenceGenerator(name = "tarefa_seq", sequenceName = "tarefa_seq", allocationSize = 1)
    @EqualsAndHashCode.Include @Column(name = "id")
    private Long id;
    private String titulo;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private StatusTarefa status = StatusTarefa.PENDENTE;
    private LocalDate dataCriacao =  LocalDate.now();
    private LocalDate dataLimite;
    @ManyToOne @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private Usuario usuario;
    @Enumerated(EnumType.STRING)
    private PrioridadeTarefa prioridade;
}
