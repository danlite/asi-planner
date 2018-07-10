// TODO: collapse level rows with no pertinent info

import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import LevelRow from './components/LevelRow.js'
import RolledAbilitiesRow from './components/RolledAbilitiesRow.js'
import RaceRow from './components/RaceRow.js'
import ClassMenu from './components/ClassMenu'
import { ABILITIES, CLASSES, MAX_LEVEL_COUNT, formatModifier, scoreModifier, formatSubclassName } from './constants'
import { RESET_CHARACTER_CLASS, SET_CLASS_SUBCLASS, RESET_ALL } from './actions'
import { classLevelsSelectorFactory, levelAbilityScoresSelectorFactory, isStartedSelector, isMulticlassing } from './selectors'
import { connect } from 'react-redux'
import './App.css'

const mapStateToProps = state => {
  return {
    started: isStartedSelector(state),
    multiclassing: isMulticlassing(state),
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
    },
    resetAll: () => {
      dispatch({ type: RESET_ALL })
    },
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = { compact: true }
  }

  render() {
    const { classLevels, resetClass, resetAll, finalAbilityScores, setSubclass, chosenSubclasses, started } = this.props
    const initialLevel = classLevels[1]
    const lastLevel = classLevels[MAX_LEVEL_COUNT]

    return (
      <div className={['App ui container', this.state.compact ? 'compact' : ''].join(' ')}>
        {started ? <div>
            <table className='main-table'>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  {ABILITIES.map(a => <th key={a}><label htmlFor={`rar-field-${a}`}>{a}</label></th>)}
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
                  <th>
                    Level<br />
                    <button onClick={e => this.setState({ compact: !this.state.compact })}>
                      {this.state.compact ? 'Expand' : 'Collapse'}
                    </button>
                  </th>
                  <th>{!this.state.compact && 'Class'}</th>
                  <th>Feature</th>
                  {ABILITIES.map(a => <th key={a}>{a}</th>)}
                </tr>
              </thead>
              <tbody>
                {initialLevel ?
                  Object.keys(classLevels)
                        .sort((a, b) => a - b)
                        .map(characterLevel => <LevelRow key={characterLevel} level={classLevels[characterLevel]} compact={this.state.compact} />) :
                  null
                }
                {initialLevel.class && <tr>
                  <td />
                  <td colSpan={2}/>
                  {ABILITIES.map(a => <td key={a}>
                    {finalAbilityScores[a]}
                    <br/>
                    {`(${formatModifier(scoreModifier(finalAbilityScores[a]))})`}
                  </td>)}
                </tr>}
              </tbody>
            </table>
            {Object.keys(lastLevel.classes).length && <table>
              <tbody>
                {Object.keys(lastLevel.classes).map(_class => {
                  const classInfo = CLASSES[_class]
                  if (lastLevel.classes[_class] < classInfo.subclassLevel)
                    return null

                  const subclasses = classInfo.subclasses
                  const chosenSubclass = chosenSubclasses[_class]

                  return <tr key={_class}>
                    <td>
                      {classInfo.name}{': '}
                    </td>
                    <td>
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
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
            <br/><br/><br/><br/>
            <Button negative onClick={resetAll}>Start over</Button>
          </div> :
          <ClassMenu onClassSelect={resetClass} />
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
