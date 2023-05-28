import styled from 'styled-components';
import { StyledButton } from '../Button';
import { IStyledFilterProps } from './FilterPanel.types';



export const StyledFilterPanel = styled.div`
            display: grid;
            grid-column: 1/-1;
            gap: .5rem;
            position: absolute;
            top:15%;
            background-color:#ecf0f6;
            z-index:1;
            border-radius: 10px;
            padding:2%;
            box-shadow:var(--box-shadow-1);
`;

export const StyledFilterControlDiv= styled.div<IStyledFilterProps>`
display:flex;
flex-wrap: wrap;
gap:2%;
justify-content: ${({justify}) => justify ?? 'space-evenly'};
margin:2% 0
`;

export const StyledFilterButton = styled(StyledButton)<IStyledFilterProps>`
width: ${({width}) => width ?? '50%'};

height: 35px;
border: ${({isButtonGroup}) => isButtonGroup ? '1px solid var(--color-active-light)' : 'none'};
&:hover {
box-shadow: none;
transform: none;

          }
`;