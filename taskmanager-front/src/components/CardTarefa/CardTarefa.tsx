import { FaCalendarAlt, FaUser } from "react-icons/fa";
import styled from "styled-components";
import type { Tarefa } from "../../types/Tarefa";
import { atualizarStatusTarefa, deleteTarefa } from "../../services/taskService";

const CardDiv = styled.div` 
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 20px;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`
const CardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-itens: flex-start;
    width: 100%;
`
const CardTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #363636;
    margin: 0;
    flex: 1;
`
const CardDescription = styled.p`
    color: #4a4a4a;
    margin-bottom: 20px;
    line-height: 1.5;
`
const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
const DeadlineDiv = styled.div`
    display: flex;
    align-items: center;
    color: #ff3860;
    font-size: 0.875rem;
    font-weight: 500;
`
const DeadlineIcon = styled(FaCalendarAlt)`
    margin-right: 5px;
    font-size: 0.875rem;
`
const UserDiv = styled.div`
    display: flex;
    background-color: #b4b4b4ff;
    padding: 4px;
    border-radius: 10px;
    align-items: center;
    color: #443f3fff;
    font-size: 12px;
`
const UserIcon = styled(FaUser)`
    margin-right: 3px;
    font-size: 0.875rem;
`
const UserName = styled.span`
    font-weight: 500;
    color: #363636;
`
const CardInfos = styled.div`
    display: flex;
    flex-direction: column;
    align-itens: flex-start;
    gap: 5px;
`
type PrioridadeProps = {
    prioridadeTipo: string;
};
const CardPrioridade = styled.p<PrioridadeProps>`
    color: ${({ prioridadeTipo }) => 
        prioridadeTipo === 'ALTA' ? 'red' : 
        prioridadeTipo === 'MEDIA' ? 'blue' : 
        'green'
    };
    font-weight: 700;
    font-size: 12px;
`
const CardStatus = styled.p`
    font-weight: 700;
    font-size: 12px;
`
const Button = styled.button`
    padding: 8px;
    background-color: #2c6dff;
    width: 60%;
    height: 35px;
    color: white;
    font-size: 13px;
    font-weight: 700;
    border-radius: 8px;
    text-align: center;
    align-self: center;

    &:hover {
        background-color: #3f73e2ff;
    }
`
const ButtonDelete = styled.button`
    padding: 8px;
    background-color: #ff3860;
    width: 60%;
    height: 35px;
    color: white;
    font-size: 13px;
    font-weight: 700;
    border-radius: 8px;
    text-align: center;
    align-self: center;

    &:hover {
        background-color: #ff5c7c;
    }
`

type Props = {
    tarefa: Tarefa;
    onStatusChange: (tarefaAtualizada: Tarefa) => void;
    onDelete: (id: number) => void;
}

const CardTarefa = ({ tarefa, onStatusChange, onDelete }: Props) => {
    const getBotaoConfig = () => {
        if (tarefa.status === "PENDENTE") {
            return {label: "Iniciar", nextStatus: "EM_ANDAMENTO"};
        }if (tarefa.status === "EM_ANDAMENTO") {
            return {label: "Concluir", nextStatus: "CONCLUIDA"};
        }
        return null;
    };

    const botao = getBotaoConfig();

    const handleClick = async () => {
        if (!botao) return;

        const tarefaAtualizada = await atualizarStatusTarefa(
            tarefa.id,
            botao.nextStatus
        );

        onStatusChange(tarefaAtualizada);
    };
    const handleDelete = async () => {
        const confirmacao = window.confirm(
            "Tem certeza que deseja deletar esta tarefa?"
        );

        if (!confirmacao) return;

        await deleteTarefa(tarefa.id);
        onDelete(tarefa.id)
    }

    return(
        <CardDiv>
            <CardHeader>
                <CardTitle>{tarefa.titulo}</CardTitle>
                <CardDescription>{tarefa.descricao}</CardDescription>
                <HeaderDiv>
                    <DeadlineDiv>
                        <DeadlineIcon />
                        <span>Limite: {tarefa.dataLimite}</span>
                    </DeadlineDiv>
                    <UserDiv>
                        <UserIcon />
                        <UserName>{tarefa.usuario?.nome ?? "—"}</UserName>
                    </UserDiv>
                </HeaderDiv>
            </CardHeader>
            <CardInfos>
                <CardPrioridade prioridadeTipo={tarefa.prioridade}>{tarefa.prioridade}</CardPrioridade>
                <CardStatus>{tarefa.status}</CardStatus>
                {botao && (
                    <Button onClick={handleClick}>
                        {botao.label}
                    </Button>
                )}
                <ButtonDelete onClick={handleDelete}>
                    Deletar
                </ButtonDelete>
            </CardInfos>
        </CardDiv>
    )
}

export default CardTarefa
