import React from 'react'
//Style
import styled from 'styled-components'

const NavBarDiv = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
// height: 20px;
flex-direction: row;
background-color: rgba(0, 0, 0, .7);
`
const NavBarItem = styled.div`
color: white;
padding: 10px;`

const CloseX = styled.div`
color: white;
padding: 10px;
cursor: pointer;
&:hover {
  opacity: .8;
  background-color:rgba(0, 0, 0, .6);
}`

const NavBar = (props) => {

  const close = () => {
    if (props.data) {
      props.close(props.data)
    } else {
      props.close()
    }
  }
  return (
    <NavBarDiv>
      <NavBarItem>{props.left}</NavBarItem>
      <NavBarItem>{props.title}</NavBarItem>
      <CloseX onClick={close}
      >&#x2716;</CloseX>
    </NavBarDiv>
  )
}

export default NavBar