import React, { Component } from 'react'
import { connect } from 'react-redux'
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

            if (!value)
                return

            value = parseInt(value, 10)

            dispatch({
                type: SET_ROLLED_ABILITY,
                key: ability,
                value: Math.max(3, Math.min(18, value)),
            })
        }
    }
}

class RolledAbilitiesRow extends Component {
  render() {
    return (
      <tr className="RolledAbilitiesRow">
        <td colSpan={2}>
            Rolled ability scores:
        </td>
        {ABILITIES.map(a => <td key={a}>
            <input value={this.props.abilities[a]}
                   type='number'
                   max={18}
                   min={3}
                   onChange={e => this.props.handleChange(e, a)} />
        </td>)}
      </tr>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RolledAbilitiesRow)
