import React, { Component } from 'react'
import { ABILITIES } from '../constants'

class LevelAbilityScoreCells extends Component {
  render() {
    const { abilityScores } = this.props
    return <td className='visible-on-row-hover'>
      {ABILITIES.map(a => abilityScores[a]).join(' / ')}
    </td>
  }
}

export default LevelAbilityScoreCells
