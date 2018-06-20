// TODO: collapse level rows with no pertinent info

import React, { Component } from 'react'
import LevelRow from './components/LevelRow.js'
import RolledAbilitiesRow from './components/RolledAbilitiesRow.js'
import RaceRow from './components/RaceRow.js'
import { ABILITIES, CLASSES, MAX_LEVEL_COUNT, formatModifier, scoreModifier } from './constants'
import { ADD_LEVEL_FEATURE, RESET_CHARACTER_CLASS } from './actions'
import { classLevelsSelector, levelAbilityScoresSelector } from './selectors'
import { connect } from 'react-redux'
import './App.css'

const mapStateToProps = state => {
  return {
    classLevels: classLevelsSelector(state),
    finalAbilityScores: levelAbilityScoresSelector(state)[MAX_LEVEL_COUNT],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleNewLevelFeature: e => {
      dispatch({
        type: ADD_LEVEL_FEATURE
      })
    },
    resetClass: _class => {
      dispatch({
        type: RESET_CHARACTER_CLASS,
        class: _class
      })
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = { compact: true }
  }

  render() {
    const { classLevels, resetClass, finalAbilityScores } = this.props
    const initialLevel = classLevels[0]

    return (
      <div className={['App', this.state.compact ? 'compact' : ''].join(' ')}>
        <select value={this.state.newClass || ''}
                onChange={e => this.setState({ newClass: e.target.value })}
                style={{ fontStyle: this.state.newClass ? 'normal' : 'italic' }}
        >
          <option value='' disabled>Choose class:</option>
          {Object.keys(CLASSES).map(c => <option key={c} value={c}>{CLASSES[c]}</option>)}
        </select>
        <button onClick={e => resetClass(this.state.newClass)} disabled={!this.state.newClass}>Reset levels</button>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              {ABILITIES.map(a => <th key={a}>{a}</th>)}
            </tr>
          </thead>
          <tbody>
            <RolledAbilitiesRow />
          </tbody>
          <tbody>
            <RaceRow />
          </tbody>
          <thead>
            <tr>
              <th>Level</th>
              <th>Class</th>
              <th>Feature</th>
              {ABILITIES.map(a => <th key={a}>{a}</th>)}
            </tr>
          </thead>
          <tbody>
            {initialLevel ?
              classLevels.map(level => <LevelRow key={level.characterLevel} level={level} />) :
              null
            }
            {finalAbilityScores && <tr>
              <td>
                <button onClick={e => this.setState({ compact: !this.state.compact })}>
                  {this.state.compact ? 'Expand' : 'Collapse'}
                </button>
              </td>
              <td colSpan={2}/>
              {ABILITIES.map(a => <td key={a}>
                {finalAbilityScores[a]}
                <br/>
                {`(${formatModifier(scoreModifier(finalAbilityScores[a]))})`}
              </td>)}
            </tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
