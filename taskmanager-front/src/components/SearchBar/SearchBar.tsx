import { FaSearch } from "react-icons/fa"
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0;
`
const ControlContainer = styled.div`
  position: relative;
  flex-grow: 1;
`
const SearchInput = styled.input`
  width: 100%;
  padding: 0.5em 0.75em;
  padding-left: 2.25em;
  font-size: 1rem;
  line-height: 1.5;
  color: #363636;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  }
  
  &::placeholder {
    color: #999;
  }
`
const IconContainer = styled.span`
  position: absolute;
  left: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  height: 1.5em;
  width: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`
const SearchIcon = styled(FaSearch)`
  color: #b5b5b5;
  font-size: 0.875rem;
`

const SearchBar = () => {
    return(
        <SearchContainer>
            <ControlContainer>
                <SearchInput 
                type="text" 
                placeholder="Pesquisar tarefas..."
                />
                <IconContainer>
                    <SearchIcon />
                </IconContainer>
            </ControlContainer>
        </SearchContainer>
    )
}

export default SearchBar