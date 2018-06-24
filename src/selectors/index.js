import { createSelector } from 'reselect'
import {
  ABILITIES, CLASSES, FEATS,
  STR, DEX, INT, WIS, CHA,
  MAX_LEVEL_COUNT,
  asiLevelsForClass, featMeetsPrerequisite, formatSubclassName
} from '../constants'

const TESTING = false

function sortByCharacterLevel(obj) {
  return Object.keys(obj).sort((a, b) => a - b).map(k => obj[k])
}

class CharacterLevelSelectorFactory {
  constructor() {
    this.selectors = {}
    this.createSelectorArgs = Array.from(arguments)

    this._buildSelector = this._buildSelector.bind(this)
    this.getSelector = this.getSelector.bind(this)
    this.evaluate = this.evaluate.bind(this)
    this.fetch = this.fetch.bind(this)
    this.previous = this.previous.bind(this)
    this.final = this.final.bind(this)
  }

  _buildSelector(characterLevel) {
    var previousSelector = () => null
    if (characterLevel > 1) {
      previousSelector = this.getSelector(characterLevel - 1)
    }

    const passedSelectors = this.createSelectorArgs.slice(0, -1)
    const selectorFunc = this.createSelectorArgs.slice(-1)[0]

    const selector = createSelector(
      ...passedSelectors,
      previousSelector,
      (state, characterLevel) => characterLevel,
      selectorFunc
    )

    return function() {
      return selector(arguments[0], characterLevel)
    }
  }

  getSelector(characterLevel) {
    var selector = this.selectors[characterLevel]
    if (!selector) {
      selector = this._buildSelector(characterLevel)
      this.selectors[characterLevel] = selector
    }
    return selector
  }

  evaluate(state, characterLevel = MAX_LEVEL_COUNT) {
    return this.getSelector(characterLevel)(state)
  }

  fetch(state, characterLevel) {
    return this.getSelector(characterLevel)(state)[characterLevel]
  }

  previous(state, characterLevel) {
    if (characterLevel === 1)
      return null

    return this.fetch(state, characterLevel - 1)
  }

  final(state) {
    return this.evaluate(state, MAX_LEVEL_COUNT)
  }
}

const classKeys = Object.keys(CLASSES)

const allFeatsSelector = () => FEATS
const allClassesSelector = () => classKeys

const raceSelector = state => state.race
const rolledAbilitiesSelector = state => state.rolledAbilities

const featureAsiSelector = feature => feature.asi || {}
const featureSelectedAbilitiesSelector = feature => feature.selectedAbilities

const classProgressionSelectorFactory = new CharacterLevelSelectorFactory(
  (state, characterLevel) => {
    return state.classProgression[characterLevel]
  },
  (currentLevelClass, previousLevelClassProgression, characterLevel) => {
    return {...previousLevelClassProgression, [characterLevel]: currentLevelClass}
  }
)

export const classLevelsSelectorFactory = new CharacterLevelSelectorFactory(
  raceSelector,
  classProgressionSelectorFactory.evaluate,
  (race, classProgression, lowerLevelClassLevels, characterLevel) => {
    // console.log({characterLevel, lowerLevelClassLevels, race, classProgression})
    const hasRacialFeat = !!(race && race.feat)
    const _class = classProgression[characterLevel]
    const previousClasses = lowerLevelClassLevels ? {...lowerLevelClassLevels[characterLevel - 1].classes} : {}
    const levelInClass = (previousClasses[_class] || 0) + 1
    const asi = asiLevelsForClass(_class).includes(levelInClass)
    const classes = {...previousClasses}
    if (_class)
      classes[_class] = levelInClass

    return {
      ...lowerLevelClassLevels,
      [characterLevel]: {
        'characterLevel': characterLevel,
        'feat': (hasRacialFeat && (characterLevel === 1)) || asi, // optional ASI rule
        'asi': asi,
        'capabilities': {},
        'class': _class,
        'classes': classes
      }
    }
  }
)

function testClassLevelsSelectorFactory() {
  var state = { race: { feat: true }, classProgression: { 1: 'wizard', 2: 'wizard', 3: 'wizard', 4: 'wizard', 5: 'wizard' } }
  const first3a = classLevelsSelectorFactory.evaluate(state, 3)
  const first4a = classLevelsSelectorFactory.evaluate(state, 4)
  state = { ...state, classProgression: { ...state.classProgression, 4: 'rogue' } }
  const first3b = classLevelsSelectorFactory.evaluate(state, 3)
  const first4b = classLevelsSelectorFactory.evaluate(state, 4)

  if (first3a !== first3b)
    throw new Error('first 3 should be identical!')
  else
    console.log('[OK] first 3 are identical')

  if (first4a[4].class === first4b[4].class)
    throw new Error('4th should not be the same classes!')
  else
    console.log('[OK] 4th are different classes')
}
if (TESTING)
  testClassLevelsSelectorFactory()

export function displayClassProgression(state) {
  const levels = classLevelsSelectorFactory.evaluate(state, MAX_LEVEL_COUNT)
  console.log(
    sortByCharacterLevel(levels).map(level => {
      const classKeys = Object.keys(level.classes)
      return classKeys.map(_class => {
        return `${CLASSES[_class].name} ${level.classes[_class]}`
      }).join(' / ') +
      (classKeys.length > 1 ? ` (${level.characterLevel})` : '') +
      (level.asi ? ' [ASI]' : '') +
      (level.feat ? ' [F]' : '')
    }).join('\n')
  )
}

export const featureAvailableAbilitiesSelector = createSelector(
  featureAsiSelector,
  featureSelectedAbilitiesSelector,
  (asi, selectedAbilities) => {
    const otherPool = (typeof asi.other === 'number')
    const otherSingleChoice = (asi.other && Array.isArray(asi.other))

    var other = null
    if (otherPool)
      other = asi.other
    else if (otherSingleChoice)
      other = asi.other
    else
      other = { ...asi.other }

    if (!other)
      return {}

    Object.keys(selectedAbilities).forEach(ability => {
      const increase = selectedAbilities[ability]
      if (!increase)
        return

      if (otherPool)
        other -= increase
      else if (otherSingleChoice)
        other = []
      else
        other[increase] -= 1
    })

    const available = {}

    ABILITIES.forEach(a => {
      const set = new Set()

      if (!asi[a]) {
        const selectedIncrease = selectedAbilities[a]

        if (otherPool) {
          var max = other
          if (selectedIncrease)
            max += selectedIncrease

          for (var i = max; i > 0; i--) {
            set.add(i)
          }
        } else if (otherSingleChoice) {
          if (other.includes(a)) {
            set.add(1)
          }

          if (selectedIncrease)
            set.add(1)
        } else {
          Object.keys(other).forEach(increase => {
            increase = parseInt(increase, 10)
            const count = other[increase]
            if (count <= 0)
              return

            set.add(increase)
          })

          if (selectedIncrease)
            set.add(selectedIncrease)
        }
      }

      available[a] = Array.from(set)
    })

    return available
  }
)

const levelFeaturesSelectorFactory = new CharacterLevelSelectorFactory(
  (state, characterLevel) => state.levelFeatures[characterLevel],
  (levelFeature, previousLevelFeatures, characterLevel) => {
    return {
      ...previousLevelFeatures,
      [characterLevel]: levelFeature
    }
  }
)

function testLevelFeaturesSelectorFactory() {
  var state = { levelFeatures: { 1: { c: 'cool' }, 2: { c: 'hot' } } }
  const first1a = levelFeaturesSelectorFactory.evaluate(state, 1)
  const first2a = levelFeaturesSelectorFactory.evaluate(state, 2)
  state = { ...state, levelFeatures: { ...state.levelFeatures, 2: { c: 'warm' } } }
  const first1b = levelFeaturesSelectorFactory.evaluate(state, 1)
  const first2b = levelFeaturesSelectorFactory.evaluate(state, 2)

  if (first1a !== first1b)
    throw new Error('first 1 should be identical!')
  else
    console.log('[OK] first 1 are identical')

  if (first2a[2]['c'] === first2b[2]['c'])
    throw new Error('2nd should not be the same c-values!')
  else
    console.log('[OK] 2nd are different c-values')
}
if (TESTING)
  testLevelFeaturesSelectorFactory()

const chosenFeatsSelectorFactory = new CharacterLevelSelectorFactory(
  levelFeaturesSelectorFactory.evaluate,
  (levelFeatures, lowerLevelChosenFeats, characterLevel) => {
    // console.log({levelFeatures, lowerLevelChosenFeats, characterLevel})
    const previousChosenFeats = lowerLevelChosenFeats ? lowerLevelChosenFeats[characterLevel - 1] : []
    const chosenFeats = [...previousChosenFeats]
    const levelFeature = levelFeatures[characterLevel]

    if (levelFeature && levelFeature.type === 'feat') {
      chosenFeats.push(levelFeature.id)
    }

    return {
      ...lowerLevelChosenFeats,
      [characterLevel]: chosenFeats
    }
  }
)

const abilityScoreImprovementsFromFeature = (ability, feature) =>
  feature.asi ? (feature.asi[ability] || 0) + (feature.selectedAbilities[ability] || 0) : 0

export const startingAbilityScoresSelector = createSelector(
  rolledAbilitiesSelector,
  raceSelector,
  (rolledAbilities, race) => {
    const abilities = { ...rolledAbilities }
    if (race)
      ABILITIES.forEach(a => abilities[a] += abilityScoreImprovementsFromFeature(a, race))
    return abilities
  }
)

export const levelAbilityScoresSelectorFactory = new CharacterLevelSelectorFactory(
  startingAbilityScoresSelector,
  levelFeaturesSelectorFactory.fetch,
  (startingAbilityScores, levelFeature, lowerLevelAbilityScores, characterLevel) => {
    const previousLevelAbilityScores = lowerLevelAbilityScores ?
      lowerLevelAbilityScores[characterLevel - 1] :
      startingAbilityScores

    const currentAbilityScores = { ...previousLevelAbilityScores }

    const feature = levelFeature
    if (feature)
      ABILITIES.forEach(a => currentAbilityScores[a] += abilityScoreImprovementsFromFeature(a, feature))

    return {
      ...lowerLevelAbilityScores,
      [characterLevel]: currentAbilityScores
    }
  }
)

export const collapsibleLevelsSelector = createSelector(
  classLevelsSelectorFactory.final,
  (classLevels) => {
    const collapsibleLevels = {}
    var currentAnchorLevel

    sortByCharacterLevel(classLevels).forEach((level, i) => {
      // Is first level; or has a feat, an ASI, or a different class
      const isDifferent = (
        !currentAnchorLevel ||
        level.feat || level.asi ||
        (level.class !== currentAnchorLevel.class)
      )

      if (isDifferent) {
        currentAnchorLevel = level
        return
      }

      collapsibleLevels[level.characterLevel] = currentAnchorLevel.characterLevel
    })

    return collapsibleLevels
  }
)

export const collapsedLevelsSelector = createSelector(
  collapsibleLevelsSelector,
  (collapsibleLevels) => {
    const anchorLevels = {}

    Object.keys(collapsibleLevels).map(l => parseInt(l, 10)).forEach(collapsible => {
      const anchor = collapsibleLevels[collapsible]
      var array = anchorLevels[anchor]
      if (!array)
        array = anchorLevels[anchor] = []

      array.push(collapsible)
    })

    return anchorLevels
  }
)

function abilityScoresValidForMulticlass(a, _class) {
  switch (_class) {
    case 'barbarian':
    return a[STR] >= 13

    case 'bard':
    case 'sorcerer':
    case 'warlock':
    return a[CHA] >= 13

    case 'cleric':
    case 'druid':
    return a[WIS] >= 13

    case 'fighter':
    return a[DEX] >= 13 || a[STR] >= 13

    case 'monk':
    case 'ranger':
    return a[DEX] >= 13 && a[WIS] >= 13

    case 'paladin':
    return a[STR] >= 13 && a[CHA] >= 13

    case 'rogue':
    return a[DEX] >= 13

    case 'wizard':
    return a[INT] >= 13

    default:
    return false
  }
}

export const availableClassesSelector = createSelector(
  allClassesSelector,
  levelAbilityScoresSelectorFactory.final,
  classLevelsSelectorFactory.final,
  (allClasses, levelAbilityScores, classLevels) => {
    const availableClasses = {}

    sortByCharacterLevel(classLevels).forEach(level => {
      const { characterLevel } = level
      const priorAbilityScores = levelAbilityScores[characterLevel - 1]
      const currentClass = level.class

      if (characterLevel === 1) {
        availableClasses[characterLevel] = allClasses
        return
      }

      if (abilityScoresValidForMulticlass(priorAbilityScores, currentClass)) {
        availableClasses[characterLevel] = allClasses.filter(
          c => abilityScoresValidForMulticlass(priorAbilityScores, c)
        )
      } else {
        availableClasses[characterLevel] = [currentClass]
      }
    })

    return availableClasses
  }
)

export const levelCapabilitiesSelectorFactory = new CharacterLevelSelectorFactory(
  raceSelector,
  classLevelsSelectorFactory.fetch,
  levelFeaturesSelectorFactory.previous, // use the previous because otherwise selecting a feat
                                         // could update the available feats for the current level
  (race, classLevel, previousLevelFeature, lowerLevelCapabilities, characterLevel) => {
    const previousCapabilities = lowerLevelCapabilities ?
      lowerLevelCapabilities[characterLevel - 1] :
      {...(race || {}).capabilities}

    const capabilities = {
      ...previousCapabilities,
      ...(previousLevelFeature ? previousLevelFeature.capabilities : null)
    }

    return {
      ...lowerLevelCapabilities,
      [characterLevel]: capabilities
    }
  }
)

export const availableFeatsSelector = createSelector(
  allFeatsSelector,
  levelAbilityScoresSelectorFactory.final,
  chosenFeatsSelectorFactory.final,
  levelCapabilitiesSelectorFactory.final,
  startingAbilityScoresSelector,
  raceSelector,
  classLevelsSelectorFactory.final,
  (allFeats, levelAbilityScores, levelChosenFeatIds, levelCapabilities, startingAbilityScores, race, classLevels) => {
    const availableFeats = {}

    sortByCharacterLevel(classLevels).forEach(level => {
      const { characterLevel } = level
      const firstLevel = characterLevel === 1
      const chosenFeatIds = levelChosenFeatIds[characterLevel]

      const abilityScores = firstLevel ? startingAbilityScores : levelAbilityScores[characterLevel - 1]
      const capabilities = levelCapabilities[characterLevel]

      availableFeats[characterLevel] = allFeats.filter(f => {
        return featMeetsPrerequisite(f.id, { race, abilityScores, capabilities }) && !chosenFeatIds.includes(f.id)
      })
    })

    return availableFeats
  }
)

export const formattedClassLevelsSelectorFactory = new CharacterLevelSelectorFactory(
  state => state.subclasses,
  classLevelsSelectorFactory.fetch,
  (chosenSubclasses, classLevel, lowerLevelResults, characterLevel) => {
    const classKeys = Object.keys(classLevel.classes)

    const formatted = (
      classKeys.map(_class => {
        const classInfo = CLASSES[_class]
        const subclassInfo = classInfo.subclasses[chosenSubclasses[_class]]
        var classString = `${classInfo.name} ${classLevel.classes[_class]}`

        if (subclassInfo && classLevel.classes[_class] >= classInfo.subclassLevel)
          classString = formatSubclassName(subclassInfo, true) + ' ' + classString

        return classString
      }).join(' / ') +
      (classKeys.length > 1 ? ` (${classLevel.characterLevel})` : '')
    )

    return {
      ...lowerLevelResults,
      [characterLevel]: formatted
    }
  }
)
