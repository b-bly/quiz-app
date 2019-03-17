import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const CenteredContainer = styled.div`
margin: auto 1em;
height: 100%;
display: flex;
align-items: center;
justify-content: space-between;
`

export const QuestionContainer = styled.div`
display: flex;
margin: 15px auto;
width: 80%;
box-shadow: 1px 1px 3px 1px darkgrey;
background-color: white;
text-align: left;
padding: 10px;
line-height: 1.4em;
border-radius: 1em;
`
export const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // height: 20px;
  flex-direction: row;
  background-color: rgba(0, 0, 0, .7);
  `
export const NavBarLink = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: .8;
    background-color:rgba(0, 0, 0, .6);
  }`

export const Container = styled.div`
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 100vh;
  display: inline-block;`

export const CenteredColumn = styled.div`
  margin: auto;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  `


export const AddQuestionCard = styled.div`
  display: flex;
  margin: 15px auto;
  width: 80%;
  text-align: left;
  padding: 10px;
  line-height: 1.4em;
  border-radius: 1em;
  border: 5px dashed darkgray;
`

export const Button = styled.div`
  
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-bottom: 10px;

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
  background-color: rgb(23, 112, 255);
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

export const ButtonLabel = styled.div `
  height: 100%;
  width: 100%;
  font-size: 50px;
  padding-top: 4px;
  line-height: unset!important;
`

export const QuizButton = styled(FontAwesomeIcon)`
  color: ${props => props.color};
  margin: 'auto .5em';
  margin: 0 .5em;
  cursor: pointer;
  
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline:0;
&:hover, .btn:focus {
  text-decoration: none;
  opacity: .8;
}

&:focus, .btn.focus {
  outline: 0;
}`

export const Row = styled.div`
  display: inline-block;`
