import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GROUPED_RACES } from '../constants'
import {
    SET_RACE,
    SELECT_RACE_ABILITY,
} from '../actions'
import { featureAvailableAbilitiesSelector } from '../selectors'
import ASICells from './ASICells'

const mapStateToProps = state => {
    const race = state.race
    return {
        race,
        availableAbilities: race ? featureAvailableAbilitiesSelector(race) : {}
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
    const { race, availableAbilities, handleAbilityChange } = this.props

    return (
      <tr className="RaceRow">
        <td/>
        <td colSpan={2}>
            <select value={race ? race.id : ''}
                    onChange={this.props.handleRaceChange}
                    style={{ fontStyle: race ? 'normal' : 'italic' }}
            >
                <option value='' disabled>Choose race:</option>
                {GROUPED_RACES.map(group => {
                    if (Array.isArray(group.races)) {
                        return <optgroup label={group.familyName} key={group.familyName}>
                            {group.races.map(r => <option value={r.id} key={r.id}>{r.name}</option>)}
                        </optgroup>
                    } else {
                        const race = group.races
                        return <option value={race.id} key={race.id}>
                            {race.name}
                        </option>
                    }
                })}
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
