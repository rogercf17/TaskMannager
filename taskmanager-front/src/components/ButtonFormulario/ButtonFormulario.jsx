import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
    height: 40px;
    width: 150px;
    padding: 8px;
    background-color: #2c6dff;
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    border-radius: 8px;

    &:hover {
        background-color: #3f73e2ff;
    }
`

const ButtonFormulario = () => {
    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate("/nova-tarefa")}>
            Nova Tarefa
        </Button>
    )
}

export default ButtonFormulario