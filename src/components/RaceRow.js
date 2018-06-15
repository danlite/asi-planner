import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ABILITIES, RACES } from '../constants'
import {
    SET_RACE,
    SELECT_RACE_ABILITY,
    SET_CHARACTER_LEVEL_CLASS,
} from '../actions'
import { getAvailableAbilities } from '../reducers'
import ASICells from './ASICells'

const mapStateToProps = state => {
    return {
        race: state.race,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRaceChange: event => {
            const race = event.target.value || null
            dispatch({
                type: SET_RACE,
                race: race
            })
        },
        handleAbilityChange: (event, ability) => {
            const increase = event.target.value || null
            dispatch({
                type: SELECT_RACE_ABILITY,
                key: ability,
                value: increase
            })
        }
    }
}

class RaceRow extends Component {
  render() {
    const { race, handleAbilityChange } = this.props
    const availableAbilities = race ?
        getAvailableAbilities(race.asi, race.selectedAbilities) :
        null

    return (
      <tr className="RaceRow">
        <td>Race:</td>
        <td>
            <select value={race ? race.id : ''}
                    onChange={this.props.handleRaceChange}>
                <option value=""></option>
                {RACES.map(r => <option value={r.id} key={r.id}>
                    {r.name}
                </option>)}
            </select>
        </td>
        <ASICells {...{ feature: race, availableAbilities, handleAbilityChange }} />
      </tr>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaceRow)
