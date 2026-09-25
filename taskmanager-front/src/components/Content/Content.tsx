import SearchBar from "../SearchBar/SearchBar";
import ButtonFormulario from "../ButtonFormulario/ButtonFormulario.jsx";
import styled from "styled-components";
import CardTarefa from "../CardTarefa/CardTarefa";
import { useEffect, useState } from "react";
import { getTarefas } from "../../services/taskService.js";
import type { Tarefa } from "../../types/Tarefa";
import type { FiltroTarefa } from "../../types/FiltroTarefa.js";
import Sidebar from "../Sidebar/SideBar.js";

const Section = styled.section`
    width: 80%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
`
const ControlDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
`

type Props = {
    filtro: FiltroTarefa;
};
export default function Content({ filtro }: Props) {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const loadTarefas = async () => {
        try {
            const data = await getTarefas();
            console.log("Resposta da API:", data);
            setTarefas(data);
        }catch (error) {
            console.error("Erro ao carregar tarefas:", error)
            setTarefas([]);
        }
    };

    const atualizarStatusLocal = (tarefaAtualizada: Tarefa) => {
        setTarefas((prev) => 
            prev.map((t) =>
                t.id === tarefaAtualizada.id ? tarefaAtualizada : t
            )
        );
    };
    const removerTarefaLocal = (id: number) => {
        setTarefas((prev) => prev.filter((t) => t.id !== id));
    };

    useEffect(() => {
        loadTarefas();
    }, []);

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "TODAS") return true;
        if (filtro === "IMPORTANTE") return tarefa.prioridade === "ALTA";
        if (filtro === "EM_ANDAMENTO") return tarefa.status === "EM_ANDAMENTO";
        if (filtro === "CONCLUIDAS") return tarefa.status === "CONCLUIDA";

        return true;
    })

    return(
        <Section>
            <ControlDiv>
                <SearchBar />
                <ButtonFormulario />
            </ControlDiv>
            {tarefasFiltradas.length === 0 ? (
                <p>Nenhuma tarefa cadastrada</p>
            ) : (
                tarefasFiltradas.map((tarefa) => (
                    <CardTarefa
                        key={tarefa.id}
                        tarefa={tarefa}
                        onStatusChange={atualizarStatusLocal}
                        onDelete={removerTarefaLocal}
                    />
                ))
            )}
        </Section>
    )
}