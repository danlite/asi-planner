import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { MobileViewport, DefaultViewport } from './Responsive'
import { Dropdown, Popup } from 'semantic-ui-react'
import { CLASSES, FEATS, ABILITIES } from '../constants'
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
      const value = data ? data.value : event.target.value
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
        class: data ? data.value : event.target.value,
        level: ownProps.level.characterLevel,
      })
    },
  }
}

class LevelRow extends Component {
  state = { tooltipOpen: false }
  toggleTooltip = show => this.setState({ tooltipOpen: show })
  showTooltip = () => this.toggleTooltip(true)
  hideTooltip = () => this.toggleTooltip(false)
  handleRowRef = node => this.setState({ row: node })

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
      compact,
    } = this.props

    const { tooltipOpen, row } = this.state

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

    const tooltipContent = <div>
      {formattedClassLevels}
      <br/>
      <table>
        <tbody>
          <tr>{ABILITIES.map(a => <th key={a}>{a}</th>)}</tr>
          <tr>{ABILITIES.map(a => <td key={a}>{abilityScores[a]}</td>)}</tr>
        </tbody>
      </table>
    </div>

    return (
      <tr className={['LevelRow', collapsibleAnchorLevel ? 'collapsible' : ''].join(' ')}
          ref={this.handleRowRef}
          onMouseOver={this.showTooltip}
          onMouseOut={this.hideTooltip}>
        <td style={{ color: 'white', backgroundColor: `#${CLASSES[level.class].color}` }}>
          <span className='collapsible'>{level.characterLevel}</span>
          <span className='collapsed'>{collapsedLevelLabel}</span>
        </td>
        <td>
          {!compact && <Fragment>
            <DefaultViewport>
              <Dropdown fluid selection
                        value={level.class}
                        onChange={handleClassChange}
                        options={shorthandClassItems} />
            </DefaultViewport>
            <MobileViewport>
              <select value={level.class} onChange={handleClassChange}>
                {Object.keys(CLASSES).map(c => <option key={c} value={c} disabled={!availableClasses.includes(c)}>
                  {CLASSES[c].name}
                </option>)}
              </select>
            </MobileViewport>
          </Fragment>}
        </td>
        <td>{level.asi || level.feat ?
          <Fragment>
            <DefaultViewport>
              <Dropdown placeholder={featurePlaceholderText} fluid search selection
                        options={shorthandFeatureItems}
                        value={feature ? feature.id : ''}
                        onChange={this.props.handleTypeChange}
                        selectOnBlur={false}
              />
            </DefaultViewport>
            <MobileViewport>
              <select value={feature ? feature.id : ''}
                      onChange={this.props.handleTypeChange}
                      style={{ fontStyle: feature ? 'normal' : 'italic' }}>
                <option value=''>Choose {selectLabelWords.join(' or ')}:</option>
                {level.asi && <option value='asi'>ASI</option>}
                {feature && feature.type === 'feat' && <option value={feature.id}>{feature.name}</option>}
                {availableFeats.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </MobileViewport>
          </Fragment>:
          null
        }</td>
        {<ASICells {...{ feature, availableAbilities, handleAbilityChange }} />}
        <Popup context={row}
               content={tooltipContent}
               wide position='right center'
               open={tooltipOpen} />
      </tr>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelRow)
