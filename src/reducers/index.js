// import { combineReducers } from 'redux'
import {
    STR, DEX, CON, INT, WIS, CHA,
    RACES, MAX_LEVEL_COUNT,
} from '../constants'
import {
    SET_ROLLED_ABILITY,
    SET_RACE,
    SELECT_RACE_ABILITY,
    REMOVE_LEVEL_FEATURE,
    ADD_LEVEL_FEATURE,
    SELECT_LEVEL_FEATURE_ABILITY,
    SELECT_FEAT,
    SELECT_ASI,
    SET_CHARACTER_LEVEL_CLASS,
    RESET_CHARACTER_CLASS,
    SET_CLASS_SUBCLASS,
} from '../actions'
import { classLevelsSelectorFactory } from '../selectors'

const INITIAL_ROLLED_ABILITIES = {
    [STR]: 10,
    [DEX]: 10,
    [CON]: 10,
    [INT]: 10,
    [WIS]: 10,
    [CHA]: 10
}

const INITIAL_CLASS_PROGRESSION = new Array(MAX_LEVEL_COUNT)

function classProgression(state = INITIAL_CLASS_PROGRESSION, action) {
    switch (action.type) {
        case SET_CHARACTER_LEVEL_CLASS:
        if (action.class > MAX_LEVEL_COUNT || action.class < 1)
            return state

        return {
            ...state,
            [action.level]: action.class
        }

        case RESET_CHARACTER_CLASS:
        state = {}
        for (var i = 1; i <= MAX_LEVEL_COUNT; i++)
            state[i] = action.class
        return state

        default:
        return state
    }
}

function rolledAbilities(state = INITIAL_ROLLED_ABILITIES, action) {
    switch (action.type) {
        case SET_ROLLED_ABILITY:
        return { ...state, [action.key]: action.value }
        default:
        return state
    }
}

function levelFeature(state = null, action) {
    switch (action.type) {
        case ADD_LEVEL_FEATURE:
        case SELECT_ASI:
        return {
            type: 'asi',
            id: 'asi',
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
                [action.key]: parseInt(action.value, 10)
            }
        }

        case SELECT_FEAT:
        return {
            ...action.feat,
            type: 'feat',
            selectedAbilities: {},
        }

        case REMOVE_LEVEL_FEATURE:
        return null

        default:
        return state
    }
}

function levelFeatures(state = {}, action, classLevels = {}) {
    const { level } = action

    switch (action.type) {
        case SELECT_LEVEL_FEATURE_ABILITY:
        case SELECT_FEAT:
        case SELECT_ASI:
        return {
            ...state,
            [level]: levelFeature(state[level], action)
        }

        case REMOVE_LEVEL_FEATURE:
        state = { ...state }
        delete state[level]
        return state

        /*
            Since changing the class for a given character level,
            or changing the race (away from variant human) can
            change the available features for that level, here we
            remove any feature for a level that no longer has the
            option for a feature.
        */
        case SET_RACE:
        case SET_CHARACTER_LEVEL_CLASS:
        case RESET_CHARACTER_CLASS:
        state = { ...state }
        Object.values(classLevels).forEach(level => {
            const { characterLevel } = level
            const feature = state[characterLevel]
            if (!feature)
                return

            if (feature.type === 'asi' && !level.asi)
                delete state[characterLevel]

            if (feature.type === 'feat' && !level.feat)
                delete state[characterLevel]
        })
        return state

        default:
        return state
    }
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
                [action.key]: parseInt(action.value, 10)
            },
        }
        default:
        return state
    }
}

function subclasses(state = {}, action) {
    switch (action.type) {
        case SET_CLASS_SUBCLASS:
        return {
            ...state,
            [action.class]: action.subclass
        }

        default:
        return state
    }
}

function plannerApp(state = {}, action) {
    const newState = {
        rolledAbilities: rolledAbilities(state.rolledAbilities, action),
        race: race(state.race, action),
        classProgression: classProgression(state.classProgression, action),
        subclasses: subclasses(state.subclasses, action),
    }

    // The `levelFeatures` reducer relies on accessing the state as returned
    // by the `classLevels` selector.
    const classLevels = classLevelsSelectorFactory.evaluate(newState, MAX_LEVEL_COUNT)
    newState.levelFeatures = levelFeatures(state.levelFeatures, action, classLevels)

    return newState
}

export default plannerApp
