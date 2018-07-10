import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { CLASSES, FEATS } from '../constants'
import { SELECT_LEVEL_FEATURE_ABILITY, SELECT_FEAT, SELECT_ASI, REMOVE_LEVEL_FEATURE, SET_CHARACTER_LEVEL_CLASS } from '../actions'
import {
  featureAvailableAbilitiesSelector,
  levelAbilityScoresSelectorFactory,
  availableFeatsSelector,
  collapsedLevelsSelector,
  collapsibleLevelsSelector,
  availableClassesSelector,
  formattedClassLevelsSelectorFactory,
  isMulticlassing,
} from '../selectors'
import ASICells from './ASICells'
import LevelAbilityScoreCells from './LevelAbilityScoreCells'

const mapStateToProps = (state, ownProps) => {
    const feature = state.levelFeatures[ownProps.level.characterLevel]
    return {
        feature,
        multiclassing: isMulticlassing(state),
        collapsedLevels: collapsedLevelsSelector(state)[ownProps.level.characterLevel],
        collapsibleAnchorLevel: collapsibleLevelsSelector(state)[ownProps.level.characterLevel],
        availableFeats: availableFeatsSelector(state)[ownProps.level.characterLevel],
        abilityScores: levelAbilityScoresSelectorFactory.fetch(state, ownProps.level.characterLevel),
        availableAbilities: feature ? featureAvailableAbilitiesSelector(feature) : {},
        availableClasses: availableClassesSelector(state)[ownProps.level.characterLevel],
        formattedClassLevels: formattedClassLevelsSelectorFactory.fetch(state, ownProps.level.characterLevel),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleTypeChange: (event, data) => {
      const value = data.value
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
    handleAbilityChange: (value, ability) => {
      dispatch({
        type: SELECT_LEVEL_FEATURE_ABILITY,
        level: ownProps.level.characterLevel,
        key: ability,
        value: value,
      })
    },
    handleClassChange: (event, data) => {
      dispatch({
        type: SET_CHARACTER_LEVEL_CLASS,
        class: data.value,
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
      formattedClassLevels,
      multiclassing,
      compact,
    } = this.props

    var selectLabelWords = []
    if (level.asi)
      selectLabelWords.push('ASI')
    if (level.feat)
      selectLabelWords.push('Feat')

    var collapsedLevelLabel = level.characterLevel
    if (collapsedLevels)
      collapsedLevelLabel = `${level.characterLevel}–${collapsedLevels[collapsedLevels.length - 1]}`

    if (!level.class)
      return null

    const featurePlaceholderText = `Choose ${selectLabelWords.join(' or ')}:`
    let shorthandFeatureItems = [
      { value: '', text: featurePlaceholderText, disabled: true }
    ]

    if (level.asi)
      shorthandFeatureItems.push({ value: 'asi', text: 'ASI' })

    if (feature && feature.type === 'feat')
      shorthandFeatureItems.push({ value: feature.id, text: feature.name })

    shorthandFeatureItems = shorthandFeatureItems.concat(availableFeats.map(f => ({ value: f.id, text: f.name })))

    const shorthandClassItems = Object.keys(CLASSES).map(c => ({ value: c, text: CLASSES[c].name, disabled: !availableClasses.includes(c) }))

    return (
      <tr className={['LevelRow', collapsibleAnchorLevel ? 'collapsible' : ''].join(' ')}>
        <td style={{ color: 'white', backgroundColor: `#${CLASSES[level.class].color}` }}
            title={formattedClassLevels}
        >
          <span className='collapsible'>{level.characterLevel}</span>
          <span className='collapsed'>{collapsedLevelLabel}</span>
        </td>
        <td>
          {!compact && <Dropdown fluid
                                 selection
                                 value={level.class}
                                 onChange={handleClassChange}
                                 options={shorthandClassItems} />}
        </td>
        <td>{level.asi || level.feat ?
          <Dropdown placeholder={featurePlaceholderText} fluid search selection
                    options={shorthandFeatureItems}
                    value={feature ? feature.id : ''}
                    onChange={this.props.handleTypeChange}
                    selectOnBlur={false}
          />:
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
