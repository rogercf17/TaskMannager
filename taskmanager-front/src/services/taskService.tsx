import type { CriarTarefaDTO } from "../types/CriarTarefaDTO";

const API_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:8080"}/api/tarefas`;

export const getTarefas = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const createTarefa = async (dados: CriarTarefaDTO) => {
    const res = await fetch(
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        }
    );

    if (!res.ok) {
        throw new Error("Erro ao criar tarefa");
    }

    return res.json();
}

export const deleteTarefa = async (id:number) => {
    const res = await fetch(
        `${API_URL}/${id}`,
        {method: "DELETE",}
    );
    
    if (!res.ok) {
        throw new Error("Erro ao deletar tarefa");
    }
}

export async function atualizarStatusTarefa(id: number, status: string) {
    const res = await fetch(
        API_URL+`/${id}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        }
    );

    if (!res.ok) {
       throw new Error("Erro ao atualizar status da tarefa"); 
    }

    return res.json();
}