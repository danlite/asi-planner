export const STR = 'STR'
export const DEX = 'DEX'
export const CON = 'CON'
export const INT = 'INT'
export const WIS = 'WIS'
export const CHA = 'CHA'

export const ABILITIES = [
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA,
]

export const CLASSES = {
    'barbarian': 'Barbarian',
    'bard': 'Bard',
    'cleric': 'Cleric',
    'druid': 'Druid',
    'fighter': 'Fighter',
    'monk': 'Monk',
    'paladin': 'Paladin',
    'ranger': 'Ranger',
    'rogue': 'Rogue',
    'sorcerer': 'Sorcerer',
    'warlock': 'Warlock',
    'wizard': 'Wizard',
}

export const CLASS_ASI_LEVELS = [4, 8, 12, 16, 19]
export const FIGHTER_ASI_LEVELS = [4, 6, 8, 12, 14, 16, 19]

export function asiLevelsForClass(_class) {
    return _class === 'fighter' ?
        FIGHTER_ASI_LEVELS :
        CLASS_ASI_LEVELS
}

export const RACES = [
    {
        id: 'gnome-deep',
        name: 'Gnome (deep)',
        asi: {
            [INT]: 2,
            [DEX]: 1,
        }
    },
    {
        id: 'human-variant',
        name: 'Human (variant)',
        asi: {
            'other': { 1: 2 }
        },
        feat: true
    },
    {
        id: 'half-elf',
        name: 'Half-elf',
        asi: {
            [CHA]: 2,
            'other': { 1: 2 }
        }
    },
]

export const FEATS = [
    {
        id: 'ling',
        name: 'Linguist',
        asi: {
            [INT]: 1
        }
    },
    {
        id: 'obs',
        name: 'Observant',
        asi: {
            'other': [INT, WIS]
        }
    }
]
