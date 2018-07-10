import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import React, { Component } from 'react'
import { CLASSES } from '../constants'

class ClassMenu extends Component {
  render() {
    return <div className='ClassMenu'>{
      Object.keys(CLASSES).map(id => {
        const _class = CLASSES[id]
        return <ClassMenuItem key={id}
                              class={_class}
                              onClick={e => this.props.onClassSelect(id)} />
      })
    }</div>
  }
}

const StyledClassMenuItem = styled.div`
  background-color: #${props => props.backgroundColor};
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.7), 0px -1px 0px rgba(255, 255, 255, 0.3);
  color: white;
  padding: 20px;
  font-size: 200%;
  flex-grow: 1;
  width: 25%;
  margin-top: 5px;
  margin-left: 5px;

  &:hover {
    background-color: ${props => tinycolor(props.backgroundColor).darken().toHexString()};
    cursor: pointer;
  }
`

class ClassMenuItem extends Component {
  render() {
    const { name, color } = this.props.class
    return <StyledClassMenuItem className='ClassMenuItem' onClick={this.props.onClick} backgroundColor={color}>
      {name}
    </StyledClassMenuItem>
  }
}

export default ClassMenu
