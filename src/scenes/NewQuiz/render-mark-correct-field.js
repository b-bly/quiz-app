import React, { Fragment } from 'react'
import styled from 'styled-components'


const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${props => props.color};
  color: white;
  border-radius: 20px;
  outline:0;
  text-decoration: none;
  width: ${props => props.minus ? '38px' : 'auto'};
  cursor: pointer;

&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}`

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
  outline:0;
  border: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: calc(100% - 15px);
  font-size: 16px;
`

const renderMarkCorrectField = ({
  input: { value, onChange },
  label,
  type,
  markCorrect,
  answerLetter,
  color,
}) => {
  
  const handleSubmit = () => {
    markCorrect(answerLetter)
    onChange(answerLetter)
  }
  
  return (
    <Fragment>
      <Button 
        type={ type }
        onClick={ handleSubmit }
        color={ color }
      >c</Button>
    </Fragment>
  );
}

export default renderMarkCorrectField;