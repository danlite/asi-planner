import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
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
        handleRaceChange: (event, data) => {
            const race = data.value || null
            dispatch({
                type: SET_RACE,
                race: race
            })
        },
        handleAbilityChange: (value, ability) => {
            dispatch({
                type: SELECT_RACE_ABILITY,
                key: ability,
                value: value || null
            })
        }
    }
}

class RaceRow extends Component {
  render() {
    const { race, availableAbilities, handleAbilityChange } = this.props

    const shorthandRaceItems = GROUPED_RACES.reduce((accumulated, group) => {
        if (Array.isArray(group.races)) {
            // accumulated.push()
            group.races.forEach(r => accumulated.push({ text: r.name, value: r.id }))
        } else {
            const race = group.races
            accumulated.push({ text: race.name, value: race.id })
        }

        return accumulated
    }, [])

    return (
      <tr className="RaceRow">
        <td/>
        <td colSpan={2}>
            <Dropdown placeholder='Chose race:' fluid search selection
                      options={shorthandRaceItems}
                      value={race ? race.id : ''}
                      selectOnBlur={false}
                      onChange={this.props.handleRaceChange} />
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
