import type { Usuario } from "./Usuario";

export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
    prioridade: "ALTA" | "MEDIA" | "BAIXA";
    dataLimite: string;
    usuario: Usuario;
}