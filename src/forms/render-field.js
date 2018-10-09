import React, { Fragment } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  font-size: 16px;
  // padding: 5px;
  margin: 0;
  outline:0;
  border: none;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: calc(100% - 15px);
  font-size: 16px;
`

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <Fragment>

      <Input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}

  </Fragment>
);

export default renderField;