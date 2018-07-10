import React, { Component, Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { MobileViewport, DefaultViewport } from './Responsive'
import { ABILITIES, formatModifier } from '../constants'

class ASICells extends Component {
    render() {
        return <Fragment>
            {ABILITIES.map(a => <ASICell key={a} ability={a} {...this.props} />)}
        </Fragment>
    }
}

class ASICell extends Component {
    render() {
        const { ability, feature, handleAbilityChange, availableAbilities } = this.props
        const a = ability

        let shorthandIncreaseItems = [{ value: '' }]
        if (feature && feature.asi && !feature.asi[a] && availableAbilities && availableAbilities[a].length) {
            shorthandIncreaseItems = shorthandIncreaseItems.concat(
                availableAbilities[a].map(increase => ({ value: increase, text: formatModifier(increase) }))
            )
        }

        return <td key={a}>
            {feature && feature.asi ?
                feature.asi[a] ?
                    formatModifier(feature.asi[a]) :
                    (availableAbilities && availableAbilities[a].length) ?
                        <Fragment>
                            <DefaultViewport>
                                <Dropdown fluid selection value={feature.selectedAbilities[a] || ''}
                                          onChange={(e, data) => handleAbilityChange(data.value, a)}
                                          options={shorthandIncreaseItems}
                                />
                            </DefaultViewport>
                            <MobileViewport className='ui form'>
                                <div className='field'>
                                    <select value={feature.selectedAbilities[a] || ''}
                                            onChange={e => handleAbilityChange(e.target.value, a)}>
                                        <option value=''></option>
                                        {availableAbilities && availableAbilities[a].map(increase =>
                                            <option value={increase} key={increase}>
                                                {formatModifier(increase)}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </MobileViewport>
                        </Fragment> : // ASIs are available generally and specifically for this ability
                    null : // feature has no ASI for this ability
                null // no feature or feature has no ASIs
            }
        </td>
    }
}

export default ASICells
