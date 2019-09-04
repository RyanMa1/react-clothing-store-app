import styled from 'styled-components'
// syntax to import styled components and export it for a resusable css file
export const ButtonContainer = styled.button`
    text-transform : capitalize;
    font-size : 1.4rem;
    background: transparent;
    border: 0.2rem solid var(--lightBlue);
    border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: ${props => props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    margin: 0.2 rem;
    transition: all 0.5s ease-in-out; 
    // as i am hovering over this button do this
    &:hover{
        background: ${props => props.cart ? "var(--mainYellow)"  : "var(--lightBlue)"};
        color: var(--mainBlue);
    }
    &:focus{
        outline: none;
    }
`;