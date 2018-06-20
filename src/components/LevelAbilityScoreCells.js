import React, { Component, Fragment } from 'react'
import { ABILITIES, scoreModifier, formatModifier } from '../constants'

class LevelAbilityScoreCells extends Component {
  render() {
    const { abilityScores } = this.props
    return <td className='visible-on-row-hover'>
      {ABILITIES.map(a => abilityScores[a]).join(' / ')}
    </td>
  }
}

export default LevelAbilityScoreCells
