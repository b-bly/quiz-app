import React, { Component } from 'react'
//Style
import styled from 'styled-components'

const NavBarContainer = styled.div`
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
  console.log('props');
  
  console.log(props)
  const close = () => {
    props.close(props.quiz)
  }
  return (
    <NavBarContainer>
      <NavBarItem></NavBarItem>
      <NavBarItem>New Quiz</NavBarItem>
      <CloseX onClick={close}
      >&#x2716;</CloseX>
    </NavBarContainer>
  )
}

export default NavBar