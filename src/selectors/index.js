import { createSelector } from 'reselect'
import {
  ABILITIES, CLASSES, FEATS,
  STR, DEX, INT, WIS, CHA,
  asiLevelsForClass
} from '../constants'

const classKeys = Object.keys(CLASSES)

const allFeatsSelector = () => FEATS
const allClassesSelector = () => classKeys

const classProgressionSelector = state => state.classProgression
const raceSelector = state => state.race
const levelFeaturesSelector = state => state.levelFeatures
const rolledAbilitiesSelector = state => state.rolledAbilities

const featureAsiSelector = feature => feature.asi
const featureSelectedAbilitiesSelector = feature => feature.selectedAbilities

export const classLevelsSelector = createSelector(
  /*
    Pass in an array of class keys and it will return/print
    a representation containing the chosen classes at each level
    and whether that level grants an ASI.
    Pass in an appropriate race and it will mark first level as
    granting a feat (i.e. in the case of the variant human).

    For example, this:

    classLevels([
        'wizard',
        'wizard',
        'wizard',
        'fighter',
        'wizard',
        'wizard',
        'fighter',
        'fighter',
        'fighter'
    ], { feat: true })

    would print:

    Wizard 1 [F]
    Wizard 2
    Wizard 3
    Wizard 3 / Fighter 1 (4)
    Wizard 4 / Fighter 1 (5) [ASI] [F]
    Wizard 5 / Fighter 1 (6)
    Wizard 5 / Fighter 2 (7)
    Wizard 5 / Fighter 3 (8)
    Wizard 5 / Fighter 4 (9) [ASI] [F]
  */
  classProgressionSelector,
  raceSelector,
  (classProgression, race) => {
    const currentClasses = {}
    const classesNextAsiLevelIndex = {}
    const levels = []
    const hasRacialFeat = !!(race && race.feat)
    var characterLevel = 0

    classProgression.forEach(_class => {
      characterLevel++

      var asi = false
      var classLevel = currentClasses[_class]
      if (typeof classLevel === 'undefined')
        classLevel = 0
      classLevel++
      currentClasses[_class] = classLevel

      const asiLevels = asiLevelsForClass(_class)
      var nextAsiLevelIndex = classesNextAsiLevelIndex[_class] || 0
      const nextAsiLevel = asiLevels[nextAsiLevelIndex]
      if (nextAsiLevel === classLevel) {
        asi = true
        classesNextAsiLevelIndex[_class] = ++nextAsiLevelIndex
      }

      levels.push({
        'characterLevel': characterLevel,
          'feat': (hasRacialFeat && (characterLevel === 1)) || asi, // optional ASI rule
          'asi': asi,
          'class': _class,
          'classes': {...currentClasses}
        })
    })

    return levels
  }
)

export function displayClassProgression(state) {
  const levels = classLevelsSelector(state)
  console.log(
    levels.map(level => {
      const classKeys = Object.keys(level.classes)
      return classKeys.map(_class => {
        return `${CLASSES[_class]} ${level.classes[_class]}`
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

const chosenFeatsSelector = createSelector(
  levelFeaturesSelector,
  levelFeatures => Object.values(levelFeatures).filter(f => f.type === 'feat')
)

export const availableFeatsSelector = createSelector(
  allFeatsSelector,
  chosenFeatsSelector,
  (allFeats, chosenFeats) => {
    const chosenFeatIds = chosenFeats.map(f => f.id)
    return allFeats.filter(f => !chosenFeatIds.includes(f.id))
  }
)

const abilityScoreImprovementsFromFeature = (ability, feature) =>
  (feature.asi[ability] || 0) + (feature.selectedAbilities[ability] || 0)

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

export const levelAbilityScoresSelector = createSelector(
  startingAbilityScoresSelector,
  classLevelsSelector,
  levelFeaturesSelector,
  (startingAbilityScores, classLevels, levelFeatures) => {
    var currentAbilities = { ...startingAbilityScores }
    const levelAbilityScores = {}

    classLevels.forEach(level => {
      const abilities = { ...currentAbilities }
      const feature = levelFeatures[level.characterLevel]
      if (feature)
        ABILITIES.forEach(a => abilities[a] += abilityScoreImprovementsFromFeature(a, feature))

      levelAbilityScores[level.characterLevel] = abilities
      currentAbilities = { ...abilities }
    })

    return levelAbilityScores
  }
)

export const collapsibleLevelsSelector = createSelector(
  classLevelsSelector,
  (classLevels) => {
    const collapsibleLevels = {}
    var currentAnchorLevel

    classLevels.forEach((level, i) => {
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
  levelAbilityScoresSelector,
  classLevelsSelector,
  (allClasses, levelAbilityScores, classLevels) => {
    const availableClasses = {}

    classLevels.forEach(level => {
      const { characterLevel } = level
      const currentAbilityScores = levelAbilityScores[characterLevel]
      const currentClass = level.class

      if (abilityScoresValidForMulticlass(currentAbilityScores, currentClass)) {
        availableClasses[characterLevel] = allClasses.filter(
          c => abilityScoresValidForMulticlass(currentAbilityScores, c)
        )
      } else {
        availableClasses[characterLevel] = [currentClass]
      }
    })

    return availableClasses
  }
)
