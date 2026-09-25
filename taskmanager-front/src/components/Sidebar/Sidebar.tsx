import { FaCheckCircle, FaFolder, FaStar, FaCircleNotch } from "react-icons/fa"
import styled from "styled-components"
import type { FiltroTarefa } from "../../types/FiltroTarefa"

const MenuLateral = styled.aside`
    background-color: #f8f9fa;
    width: 250px;
    min-height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
`
const TitleDiv = styled.div`
    margin-bottom: 1.25rem;
`
const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4a4a;
`
const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #7a7a7a;
`
const NavDiv = styled.div`
    margin-bottom: 1rem;
  
    &:last-child {
        margin-bottom: 0;
    }
`
const NavLink = styled.a`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    color: ${({ active }) => (active ? "#3273dc" : "#4a4a4a")};
    
    &:hover {
        color: #3273dc;
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`
const IconWrapper = styled.span`
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
`
const LinkText = styled.span`
    font-weight: 600;
`

type Props = {
    filtro: FiltroTarefa;
    setFiltro: (filtro: FiltroTarefa) => void;
};
const Sidebar = ({ filtro, setFiltro }: Props) => {
    return(
        <MenuLateral>
            <TitleDiv>
                <Title>
                    TaskManager
                </Title>
                <Subtitle>
                    Gerenciador de Tarefas
                </Subtitle>
            </TitleDiv>

            <nav>
                <NavDiv>
                    <NavLink
                        active={filtro === "TODAS"}
                        onClick={() => setFiltro("TODAS")}
                    >
                        <IconWrapper>
                            <FaFolder />
                        </IconWrapper>
                        <LinkText>Todas</LinkText>
                    </NavLink>
                </NavDiv>

                <NavDiv>
                    <NavLink 
                        active={filtro === "IMPORTANTE"}
                        onClick={() => setFiltro("IMPORTANTE")}
                    >
                        <IconWrapper>
                            <FaStar />
                        </IconWrapper>
                        <LinkText>Importante</LinkText>
                    </NavLink>
                </NavDiv>

                <NavDiv>
                    <NavLink 
                        active={filtro === "EM_ANDAMENTO"}
                        onClick={() => setFiltro("EM_ANDAMENTO")}
                    >
                        <IconWrapper>
                            <FaCircleNotch />
                        </IconWrapper>
                        <LinkText>Em Andamento</LinkText>
                    </NavLink>
                </NavDiv>

                <NavDiv>
                    <NavLink 
                        active={filtro === "CONCLUIDAS"}
                        onClick={() => setFiltro("CONCLUIDAS")}
                    >
                        <IconWrapper>
                            <FaCheckCircle />
                        </IconWrapper>
                        <LinkText>Concluidos</LinkText>
                    </NavLink>
                </NavDiv>
            </nav>
        </MenuLateral>
    )
}

export default Sidebar