// TODO: collapse level rows with no pertinent info

import React, { Component } from 'react'
import LevelRow from './components/LevelRow.js'
import RolledAbilitiesRow from './components/RolledAbilitiesRow.js'
import RaceRow from './components/RaceRow.js'
import { ABILITIES, CLASSES, MAX_LEVEL_COUNT, formatModifier, scoreModifier, formatSubclassName } from './constants'
import { RESET_CHARACTER_CLASS, SET_CLASS_SUBCLASS } from './actions'
import { classLevelsSelectorFactory, levelAbilityScoresSelectorFactory } from './selectors'
import { connect } from 'react-redux'
import './App.css'

const mapStateToProps = state => {
  return {
    chosenSubclasses: state.subclasses,
    classLevels: classLevelsSelectorFactory.evaluate(state, MAX_LEVEL_COUNT),
    finalAbilityScores: levelAbilityScoresSelectorFactory.fetch(state, MAX_LEVEL_COUNT),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetClass: _class => {
      dispatch({
        type: RESET_CHARACTER_CLASS,
        class: _class
      })
    },
    setSubclass: (_class, subclass) => {
      dispatch({
        type: SET_CLASS_SUBCLASS,
        class: _class,
        subclass
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
    const { classLevels, resetClass, finalAbilityScores, setSubclass, chosenSubclasses } = this.props
    const initialLevel = classLevels[1]
    const lastLevel = classLevels[MAX_LEVEL_COUNT]

    return (
      <div className={['App', this.state.compact ? 'compact' : ''].join(' ')}>
        <select value={this.state.newClass || ''}
                onChange={e => this.setState({ newClass: e.target.value })}
                style={{ fontStyle: this.state.newClass ? 'normal' : 'italic' }}
        >
          <option value='' disabled>Choose class:</option>
          {Object.keys(CLASSES).map(c => <option key={c} value={c}>{CLASSES[c].name}</option>)}
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
              Object.keys(classLevels)
                    .sort((a, b) => a - b)
                    .map(characterLevel => <LevelRow key={characterLevel} level={classLevels[characterLevel]} />) :
              null
            }
            {initialLevel.class && <tr>
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
        {Object.keys(lastLevel.classes).map(_class => {
          const classInfo = CLASSES[_class]
          if (lastLevel.classes[_class] < classInfo.subclassLevel)
            return null

          const subclasses = classInfo.subclasses
          const chosenSubclass = chosenSubclasses[_class]

          return <div key={_class}>
            {classInfo.name}{': '}
            <select value={chosenSubclass || ''}
                    onChange={e => setSubclass(_class, e.target.value)}
                    style={{ fontStyle: chosenSubclass ? 'normal' : 'italic' }}
            >
              <option value='' disabled>{classInfo.subclassType}:</option>
              {Object.keys(subclasses).map(subclassKey => {
                const subclass = subclasses[subclassKey]
                return <option key={subclassKey} value={subclassKey}>{formatSubclassName(subclass)}</option>
              })}
            </select>
          </div>
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
