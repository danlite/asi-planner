import React, { Component, Fragment } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { ABILITIES, formatModifier } from '../constants'

class ASICells extends Component {
    render() {
        const { feature, availableAbilities, handleAbilityChange } = this.props
        return <Fragment>
            {ABILITIES.map(a => <ASICell ability={a} {...this.props} />)}
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
                        <Dropdown fluid selection value={feature.selectedAbilities[a] || ''}
                                  onChange={(e, data) => handleAbilityChange(data.value, a)}
                                  options={shorthandIncreaseItems}
                        /> : // ASIs are available generally and specifically for this ability
                    null : // feature has no ASI for this ability
                null // no feature or feature has no ASIs
            }
        </td>
    }
}

export default ASICells
