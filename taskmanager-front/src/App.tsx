import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar.js"
import Content from "./components/Content/Content"
import styled from "styled-components"
import type { FiltroTarefa } from "./types/FiltroTarefa"
import { Route, Routes } from "react-router-dom"
import CriarTarefa from "./pages/CriarTarefa"

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 0;
    overflow-y: hidden;
`

function App() {
  const [filtro, setFiltro] = useState<FiltroTarefa>("TODAS");

  return (
    <Container>
      <Sidebar filtro={filtro} setFiltro={setFiltro}/>
      <Routes>
        <Route path="/" element={<Content filtro={filtro} />} />
        <Route path="/nova-tarefa" element={<CriarTarefa />} />
      </Routes>
    </Container>
  )
}

export default App
