import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CLASSES, FEATS } from '../constants'
import { SELECT_LEVEL_FEATURE_ABILITY, SELECT_FEAT, SELECT_ASI, REMOVE_LEVEL_FEATURE, SET_CHARACTER_LEVEL_CLASS } from '../actions'
import {
  featureAvailableAbilitiesSelector,
  levelAbilityScoresSelector,
  availableFeatsSelector,
  collapsedLevelsSelector,
  collapsibleLevelsSelector,
  availableClassesSelector,
} from '../selectors'
import ASICells from './ASICells'
import LevelAbilityScoreCells from './LevelAbilityScoreCells'

const mapStateToProps = (state, ownProps) => {
    const feature = state.levelFeatures[ownProps.level.characterLevel]
    return {
        feature,
        collapsedLevels: collapsedLevelsSelector(state)[ownProps.level.characterLevel],
        collapsibleAnchorLevel: collapsibleLevelsSelector(state)[ownProps.level.characterLevel],
        availableFeats: availableFeatsSelector(state)[ownProps.level.characterLevel],
        abilityScores: levelAbilityScoresSelector(state)[ownProps.level.characterLevel],
        availableAbilities: feature ? featureAvailableAbilitiesSelector(feature) : {},
        availableClasses: availableClassesSelector(state)[ownProps.level.characterLevel],
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTypeChange: e => {
      const value = e.target.value
      if (!value) {
        dispatch({
            type: REMOVE_LEVEL_FEATURE,
            level: ownProps.level.characterLevel
        })
      } else if (value === 'asi') {
        dispatch({
          type: SELECT_ASI,
          level: ownProps.level.characterLevel,
        })
      } else {
        dispatch({
          type: SELECT_FEAT,
          level: ownProps.level.characterLevel,
          feat: FEATS.find(f => f.id === value)
        })
      }
    },
    handleAbilityChange: (event, ability) => {
      dispatch({
        type: SELECT_LEVEL_FEATURE_ABILITY,
        level: ownProps.level.characterLevel,
        key: ability,
        value: event.target.value,
      })
    },
    handleClassChange: event => {
      dispatch({
        type: SET_CHARACTER_LEVEL_CLASS,
        class: event.target.value,
        level: ownProps.level.characterLevel,
      })
    },
  }
}

class LevelRow extends Component {
  render() {
    const {
      feature,
      availableAbilities,
      level,
      availableFeats,
      availableClasses,
      abilityScores,
      collapsedLevels,
      collapsibleAnchorLevel,
      handleAbilityChange,
      handleClassChange,
    } = this.props
    const classKeys = Object.keys(level.classes)

    var selectLabelWords = []
    if (level.asi)
      selectLabelWords.push('ASI')
    if (level.feat)
      selectLabelWords.push('Feat')

    var collapsedLevelLabel = level.characterLevel
    if (collapsedLevels)
      collapsedLevelLabel = `${level.characterLevel}–${collapsedLevels[collapsedLevels.length - 1]}`

    return (
      <tr className={['LevelRow', collapsibleAnchorLevel ? 'collapsible' : ''].join(' ')}>
        <td style={{ color: 'white', backgroundColor: `#${CLASSES[level.class].color}` }}
            title={
              classKeys.map(_class => `${CLASSES[_class].name} ${level.classes[_class]}`).join(' / ') +
              (classKeys.length > 1 ? ` (${level.characterLevel})` : '')
            }
        >
          <span className='collapsible'>{level.characterLevel}</span>
          <span className='collapsed'>{collapsedLevelLabel}</span>
        </td>
        <td>
          <select value={level.class} onChange={handleClassChange}>
            {Object.keys(CLASSES).map(c => <option key={c} value={c} disabled={!availableClasses.includes(c)}>
              {CLASSES[c].name}
            </option>)}
          </select>
        </td>
        <td>{level.asi || level.feat ?
          <select value={feature ? feature.id : ''}
                  onChange={this.props.handleTypeChange}
                  style={{ fontStyle: feature ? 'normal' : 'italic' }}
          >
            <option value=''>Choose {selectLabelWords.join(' or ')}:</option>
            {level.asi && <option value='asi'>ASI</option>}
            {feature && feature.type === 'feat' && <option value={feature.id}>{feature.name}</option>}
            {availableFeats.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select> :
          null
        }</td>
        {<ASICells {...{ feature, availableAbilities, handleAbilityChange }} />}
        {<LevelAbilityScoreCells abilityScores={abilityScores} />}
      </tr>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelRow)
