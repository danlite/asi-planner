import React, { Component } from 'react'
import { connect } from 'react-redux'
import ASICells from './ASICells'
import { FEATS } from '../constants'
import { SELECT_FEAT, SELECT_ASI, SELECT_LEVEL_FEATURE_ABILITY } from '../actions'
import { featureAvailableAbilitiesSelector } from '../selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    availableAbilities: featureAvailableAbilitiesSelector(ownProps.feature)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTypeChange: e => {
      const value = e.target.value
      if (value === 'asi') {
        dispatch({
          type: SELECT_ASI,
          index: ownProps.index,
        })
      } else {
        dispatch({
          type: SELECT_FEAT,
          index: ownProps.index,
          feat: FEATS.find(f => f.id === value)
        })
      }
    },
    handleAbilityChange: (event, ability) => {
      dispatch({
        type: SELECT_LEVEL_FEATURE_ABILITY,
        index: ownProps.index,
        key: ability,
        value: event.target.value,
      })
    }
  }
}

/*
function getAvailableASIs(feature) {
  const MAX = 2
  const asi = feature.asi
  const total = Object.values(asi).reduce((sum, n) => sum + (n || 0))
  const remaining = MAX - total
  const available = {}

  ABILITIES.forEach(a => {
    const options = []
    var current = asi[a] || 0
    const delta = current - remaining

    if (current > remaining)

    available[a] = options
  })

  return available
}
*/

class LevelFeatureRow extends Component {
  render() {
    const { feature, availableAbilities, handleAbilityChange } = this.props

    return (
      <tr className='LevelFeatureRow'>
        <td/>
        <td>
          <select onChange={this.props.handleTypeChange}>
            <option value='asi'>ASI</option>
            {FEATS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </td>
        <ASICells {...{ feature, availableAbilities, handleAbilityChange }} />
      </tr>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LevelFeatureRow)
