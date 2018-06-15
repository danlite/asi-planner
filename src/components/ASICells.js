import React, { Component, Fragment } from 'react'
import { ABILITIES } from '../constants'

class ASICells extends Component {
    render() {
        const { feature, availableAbilities, handleAbilityChange } = this.props
        return <Fragment>
            {ABILITIES.map(a => <td key={a}>
                {feature ?
                    feature.asi[a] ?
                        feature.asi[a] :
                        (availableAbilities && availableAbilities[a].length) ?
                            <select value={feature.selectedAbilities[a] || ''}
                                    onChange={e => handleAbilityChange(e, a)}>
                                <option value=''></option>
                                {availableAbilities && availableAbilities[a].map(increase =>
                                    <option value={increase} key={increase}>
                                        {increase}
                                    </option>
                                )}
                            </select> :
                        null :
                    null
                }
            </td>)}
        </Fragment>
    }
}

export default ASICells
