export interface CriarTarefaDTO {
  titulo: string;
  descricao: string;
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  dataCriacao: string;
  dataLimite: string;
  usuarioId: number;
  prioridade: "ALTA" | "MEDIA" | "BAIXA";
}
