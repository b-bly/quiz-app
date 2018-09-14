import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  font-size: 16px;
  padding: 5px;
  outline:0;
  border: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: calc(100% - 15px);
  font-size: 16px;
`

const renderTextArea = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <TextArea {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default renderTextArea;