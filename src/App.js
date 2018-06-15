import React, { Component } from 'react'
import LevelFeatureRow from './components/LevelFeatureRow.js'
import RolledAbilitiesRow from './components/RolledAbilitiesRow.js'
import RaceRow from './components/RaceRow.js'
import { ABILITIES } from './constants'
import { ADD_LEVEL_FEATURE } from './actions'
import { connect } from 'react-redux'
import './App.css'

const mapStateToProps = state => {
  return {
    levelFeatures: state.levelFeatures,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleNewLevelFeature: e => {
      dispatch({
        type: ADD_LEVEL_FEATURE
      })
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
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
              <th>Feature</th>
              {ABILITIES.map(a => <th key={a}>{a}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.levelFeatures.map((f, i) => <LevelFeatureRow key={i} feature={f} index={i} />)}
          </tbody>
        </table>
        <button onClick={this.props.handleNewLevelFeature}>New level feature</button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
