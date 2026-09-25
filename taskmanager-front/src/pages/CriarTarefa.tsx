import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CriarTarefaDTO } from "../types/CriarTarefaDTO";
import { createTarefa } from "../services/taskService";
import styled from "styled-components";

const Form = styled.form`
    padding: 10px;
    margin: 20px;
    width: 80%;
    height: 80vh;
    display: flex;
    align-itens: center;
    flex-flow: column nowrap;
    text-align: center;
    gap: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export default function CriarTarefa() {
    const navigate = useNavigate();

    const [form, setForm] = useState<CriarTarefaDTO>({
        titulo: "",
        descricao: "",
        status: "PENDENTE",
        dataCriacao: new Date().toISOString().split("T")[0],
        dataLimite: "",
        usuarioId: 1,
        prioridade: "MEDIA",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.titulo || !form.dataLimite || !form.prioridade) {
            alert("Preencha os campos obrigatórios");
            return;
        }

        try {
            await createTarefa(form);
            navigate("/")
        } catch (error) {
            alert("Erro ao criar a tarefa")
            console.error(error)
        }
    };

    return(
        <Form onSubmit={handleSubmit}>
            <h2>Nova Tarefa</h2>

            <input
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                required
            />

            <textarea
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={handleChange}
            />

            <select name="status" value={form.status} onChange={handleChange}>
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
            </select>

            <input
                type="date"
                name="dataCriacao"
                value={form.dataCriacao}
                onChange={handleChange}
            />

            <input
                type="date"
                name="dataLimite"
                value={form.dataLimite}
                onChange={handleChange}
                required
            />

            <select name="prioridade" value={form.prioridade} onChange={handleChange}>
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Média</option>
                <option value="BAIXA">Baixa</option>
            </select>

            <input
                type="number"
                name="usuarioId"
                value={form.usuarioId}
                onChange={handleChange}
            />

            <button type="submit">Criar tarefa</button>
            <button onClick={() => navigate("/")}>Voltar</button>
        </Form>
    );
}