import React from 'react'
import styled from 'styled-components'
import { colors } from '../Style/constants'


const Button = styled.div`
  
border-radius: 50%;
width: 26px;
height: 26px;

display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;

background-color: ${props => props.color};
font-weight: 400;
text-align: center;
white-space: nowrap;
vertical-align: middle;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
border: 1px solid transparent;

transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
color: white;
outline:0;
text-decoration: none;
cursor: pointer;

&:hover, .btn:focus {
text-decoration: none;
opacity: .8;
}

&:focus, .btn.focus {
outline: 0;
}
`

const ButtonLabel = styled.div`
height: 100%;
width: 100%;
font-size: 30px;
line-height: unset!important;
`

const RoundButton = (props) => {
  return (
    <Button
      color={props.color}
      onClick={props.action}
    ><ButtonLabel
      aria-label={props.ariaLabel}
    >{props.text}</ButtonLabel></Button>
  )
}

export default RoundButton