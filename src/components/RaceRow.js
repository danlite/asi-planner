import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { MobileViewport, DefaultViewport } from './Responsive'
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
            const race = (data ? data.value : event.target.value) || null
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
            group.races.forEach(r => accumulated.push({ text: r.name, value: r.id }))
        } else {
            const race = group.races
            accumulated.push({ text: race.name, value: race.id })
        }

        return accumulated
    }, [])

    return (
      <tr className="RaceRow">
        <td colSpan={3}>
            <DefaultViewport>
                <Dropdown placeholder='Chose race:' fluid search selection
                          options={shorthandRaceItems}
                          value={race ? race.id : ''}
                          selectOnBlur={false}
                          onChange={this.props.handleRaceChange} />
            </DefaultViewport>
            <MobileViewport className='ui form'>
                <div className='field'>
                    <select value={race ? race.id : ''}
                                        onChange={this.props.handleRaceChange}
                                        style={{ fontStyle: race ? 'normal' : 'italic' }}>
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
                </div>
            </MobileViewport>
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
