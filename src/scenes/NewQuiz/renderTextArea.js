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
  resize: none;
`

class TextAreaResize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 'auto'
    }
  }
  resize(e) {
    // console.log(e.target.scrollHeight);
    // const height = e.target.scrollHeight + 'px';
    // this.setState({
    //   height: 'auto'
    // })
    // https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
  }
  render() {
    const style = {
      height: this.state.height
    }
    return (
      <TextArea {...this.props}
      // onChange={this.resize.bind(this)} 
      style={style}/>
    )
  }
}

const renderTextArea = ({
  initialValues,
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <TextArea
{...input} placeholder={label} type={type}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

export default renderTextArea;