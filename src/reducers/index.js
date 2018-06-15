import { combineReducers } from 'redux'
import {
    STR, DEX, CON, INT, WIS, CHA,
    ABILITIES, RACES, CLASSES,
    asiLevelsForClass,
} from '../constants'
import {
    SET_ROLLED_ABILITY,
    SET_RACE,
    SELECT_RACE_ABILITY,
    ADD_LEVEL_FEATURE,
    SELECT_LEVEL_FEATURE_ABILITY,
    SELECT_FEAT,
    SELECT_ASI,
    SET_CHARACTER_LEVEL_CLASS,
    RESET_CHARACTER_CLASS,
} from '../actions'

const INITIAL_ROLLED_ABILITIES = {
    [STR]: 10,
    [DEX]: 10,
    [CON]: 10,
    [INT]: 10,
    [WIS]: 10,
    [CHA]: 10
}

const INITIAL_CLASS_PROGRESSION = new Array(20)

function classProgression(state = INITIAL_CLASS_PROGRESSION, action) {
    switch (action.type) {
        case SET_CHARACTER_LEVEL_CLASS:
        if (action.level >= 20 || action.level < 0)
            return state

        return [
            ...state.slice(0, action.level),
            action.class,
            ...state.slice(action.level + 1)
        ]

        case RESET_CHARACTER_CLASS:
        return [
            action.class,
            ...INITIAL_CLASS_PROGRESSION.slice(1)
        ]

        default:
        return state
    }
}

/*
    Pass in a sparse array of class keys and it will return/print
    a representation containing the chosen classes at each level
    and whether that level grants an ASI.
    Pass in an appropriate race and it will mark first level as
    granting a feat (i.e. in the case of the variant human).

    For example, this:

    displayClassProgression([
        'wizard',
        undefined,
        undefined,
        'fighter',
        'wizard',
        undefined,
        'fighter',
        undefined,
        undefined
    ], { feat: true })

    will print:

    Wizard 1 [F]
    Wizard 2
    Wizard 3
    Wizard 3 / Fighter 1 (4)
    Wizard 4 / Fighter 1 (5) [ASI]
    Wizard 5 / Fighter 1 (6)
    Wizard 5 / Fighter 2 (7)
    Wizard 5 / Fighter 3 (8)
    Wizard 5 / Fighter 4 (9) [ASI]
*/
export function displayClassProgression(classProgression, race) {
    const currentClasses = {}
    const classesNextAsiLevelIndex = {}
    const levels = []
    var latestClass
    var characterLevel = 0
    const hasRacialFeat = !!(race && race.feat)

    classProgression.forEach(_class => {
        if (!_class) {
            _class = latestClass
        }

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
            'feat': hasRacialFeat && (characterLevel === 1),
            'asi': asi,
            'classes': {...currentClasses}
        })
        latestClass = _class
    })

    console.log(levels.map(level => {
        const classKeys = Object.keys(level.classes)
        return classKeys.map(_class => {
            return `${CLASSES[_class]} ${level.classes[_class]}`
        }).join(' / ') +
        (classKeys.length > 1 ? ` (${level.characterLevel})` : '') +
        (level.asi ? ' [ASI]' : '') +
        (level.feat ? ' [F]' : '')
    }).join('\n'))

    return levels
}

function rolledAbilities(state = INITIAL_ROLLED_ABILITIES, action) {
    switch (action.type) {
        case SET_ROLLED_ABILITY:
        return { ...state, [action.key]: action.value }
        default:
        return state
    }
}

function levelFeature(state = {}, action) {
    switch (action.type) {
        case ADD_LEVEL_FEATURE:
        case SELECT_ASI:
        return {
            type: 'asi',
            asi: {
                'other': 2,
            },
            selectedAbilities: {},
        }

        case SELECT_LEVEL_FEATURE_ABILITY:
        return {
            ...state,
            selectedAbilities: {
                ...state.selectedAbilities,
                [action.key]: action.value
            }
        }

        case SELECT_FEAT:
        return {
            ...action.feat,
            type: 'feat',
            selectedAbilities: {},
        }

        default:
        return state
    }
}

function levelFeatures(state = [], action) {
    switch (action.type) {
        case ADD_LEVEL_FEATURE:
        return [...state, levelFeature(null, action)]

        case SELECT_LEVEL_FEATURE_ABILITY:
        case SELECT_FEAT:
        case SELECT_ASI:
        const i = action.index
        return [
            ...state.slice(0, i),
            levelFeature(state[i], action),
            ...state.slice(i + 1)
        ]

        default:
        return state
    }
}

export function getAvailableAbilities(asi, selectedAbilities) {
    const otherPool = (typeof asi.other === 'number')
    const otherSingleChoice = (asi.other && asi.other.__proto__ === [].__proto__)

    var other = null
    if (otherPool)
        other = asi.other
    else if (otherSingleChoice)
        other = asi.other
    else
        other = { ...asi.other }

    if (!other)
        return {}

    var totalSelected = 0
    Object.keys(selectedAbilities).forEach(ability => {
        const increase = selectedAbilities[ability]
        if (!increase)
            return

        totalSelected += increase

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
                    max = Math.max(max, selectedIncrease)

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

function race(state = null, action) {
    switch (action.type) {
        case SET_RACE:
        const race = RACES.find(r => r.id === action.race)
        return race ? {
            ...race,
            selectedAbilities: {},
        } : null
        case SELECT_RACE_ABILITY:
        return {
            ...state,
            selectedAbilities: {
                ...state.selectedAbilities,
                [action.key]: action.value
            },
        }
        default:
        return state
    }
}

const plannerApp = combineReducers({
    rolledAbilities,
    race,
    levelFeatures,
})

export default plannerApp
