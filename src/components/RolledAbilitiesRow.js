import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-react'
import { ABILITIES } from '../constants'
import { SET_ROLLED_ABILITY } from '../actions'

const mapStateToProps = state => {
    return {
        abilities: state.rolledAbilities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleChange: (event, ability) => {
            var value = event.target.value

            value = parseInt(value, 10)

            if (Number.isNaN(value))
              value = null

            dispatch({
                type: SET_ROLLED_ABILITY,
                key: ability,
                value: value,
            })
        }
    }
}

class RolledAbilitiesRow extends Component {
  render() {
    return (
      <tr className="RolledAbilitiesRow">
        <td colSpan={3} style={{ textAlign: 'right' }}>
            Rolled ability scores:
        </td>
        {ABILITIES.map(a => {
            const value = this.props.abilities[a]
            return <td key={a}>
                <Input value={Number.isFinite(value) ? value : ''}
                       id={`rar-field-${a}`}
                       type='number'
                       fluid
                       max={18}
                       min={3}
                       onChange={e => this.props.handleChange(e, a)} />
            </td>
        })}
      </tr>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RolledAbilitiesRow)
