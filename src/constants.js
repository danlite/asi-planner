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

export function formatModifier(value) {
    if (value < 0)
        return `-${Math.abs(value)}`

    return `+${value}`
}

export function scoreModifier(score) {
    return Math.floor((score - 10) / 2)
}

export const MAX_LEVEL_COUNT = 20

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

export const CLASS_COLORS = {
    'barbarian': 'd87860',
    'bard': 'a878a8',
    'cleric': '909090',
    'druid': '909060',
    'fighter': '604830',
    'monk': '78c0d8',
    'paladin': 'c0a860',
    'ranger': '487860',
    'rogue': '484848',
    'sorcerer': 'c06060',
    'warlock': '7848a8',
    'wizard': '4878c0',
}

export const CLASS_ASI_LEVELS = [4, 8, 12, 16, 19]
export const FIGHTER_ASI_LEVELS = [4, 6, 8, 12, 14, 16, 19]
export const ROGUE_ASI_LEVELS = [4, 8, 10, 12, 16, 19]

export function asiLevelsForClass(_class) {
    return _class === 'fighter' ?
        FIGHTER_ASI_LEVELS :

        _class === 'rogue' ?
        ROGUE_ASI_LEVELS :

        CLASS_ASI_LEVELS
}

export const RACES = [
    {
        id: 'gnome-deep',
        name: 'Gnome (deep)',
        family: 'Gnome',
        size: 'small',
        asi: {
            [INT]: 2,
            [DEX]: 1,
        }
    },
    {
        id: 'human-variant',
        name: 'Human (variant)',
        family: 'Human',
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
    {
        id: 'aarakocra',
        name: 'Aarakocra',
        asi: {
            [DEX]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'aasimar-protector',
        name: 'Aasimar (protector)',
        family: 'Aasimar',
        asi: {
            [CHA]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'aasimar-scourge',
        name: 'Aasimar (scourge)',
        family: 'Aasimar',
        asi: {
            [CHA]: 2,
            [CON]: 1
        }
    },
    {
        id: 'aasimar-fallen',
        name: 'Aasimar (fallen)',
        family: 'Aasimar',
        asi: {
            [CHA]: 2,
            [STR]: 1
        }
    },
    {
        id: 'aasimar-variant',
        name: 'Aasimar (variant)',
        family: 'Aasimar',
        asi: {
            [CHA]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'bugbear',
        name: 'Bugbear',
        asi: {
            [STR]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'dragonborn',
        name: 'Dragonborn',
        asi: {
            [STR]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'dwarf-hill',
        name: 'Dwarf (hill)',
        family: 'Dwarf',
        asi: {
            [CON]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'dwarf-mountain',
        name: 'Dwarf (mountain)',
        family: 'Dwarf',
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'duergar',
        name: 'Duergar (gray dwarf)',
        family: 'Dwarf',
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'elf-high',
        name: 'Elf (high)',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [INT]: 1
        }
    },
    {
        id: 'elf-wood',
        name: 'Elf (wood)',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [WIS]: 1,
        }
    },
    {
        id: 'drow',
        name: 'Drow (dark elf)',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'eladrin-variant',
        name: 'Eladrin (variant)',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [INT]: 1
        }
    },
    {
        id: 'elf-sea',
        name: 'Elf (sea)',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [CON]: 1
        }
    },
    {
        id: 'shadar-kai',
        name: 'Shadar-kai',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [CON]: 1
        }
    },
    {
        id: 'eladrin',
        name: 'Eladrin',
        family: 'Elf',
        asi: {
            [DEX]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'tiefling-feral',
        name: 'Tiefling (feral)',
        family: 'Tiefling',
        asi: {
            [DEX]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling',
        name: 'Tiefling',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-baalzebul',
        name: 'Tiefling (Baalzebul)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-dispater',
        name: 'Tiefling (Dispater)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'tiefling-fierna',
        name: 'Tiefling (Fierna)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'tiefling-glasya',
        name: 'Tiefling (Glasya)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'tiefling-levistus',
        name: 'Tiefling (Levistus)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [CON]: 1
        }
    },
    {
        id: 'tiefling-mammon',
        name: 'Tiefling (Mammon)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-mephistopheles',
        name: 'Tiefling (Mephistopheles)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-zariel',
        name: 'Tiefling (Zariel)',
        family: 'Tiefling',
        asi: {
            [CHA]: 2,
            [STR]: 1
        }
    },
    {
        id: 'firbolg',
        name: 'Firbolg',
        asi: {
            [WIS]: 2,
            [STR]: 1
        }
    },
    {
        id: 'genasi-air',
        name: 'Genasi (air)',
        family: 'Genasi',
        asi: {
            [CON]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'genasi-earth',
        name: 'Genasi (earth)',
        family: 'Genasi',
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'genasi-fire',
        name: 'Genasi (fire)',
        family: 'Genasi',
        asi: {
            [CON]: 2,
            [INT]: 1
        }
    },
    {
        id: 'genasi-water',
        name: 'Genasi (water)',
        family: 'Genasi',
        asi: {
            [CON]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'githyanki',
        name: 'Githyanki',
        family: 'Gith',
        asi: {
            [STR]: 2,
            [INT]: 1
        }
    },
    {
        id: 'githzerai',
        name: 'Githzerai',
        family: 'Gith',
        asi: {
            [WIS]: 2,
            [INT]: 1
        }
    },
    {
        id: 'gnome-rock',
        name: 'Gnome (rock)',
        family: 'Gnome',
        size: 'small',
        asi: {
            [INT]: 2,
            [CON]: 1
        }
    },
    {
        id: 'gnome-forest',
        name: 'Gnome (forest)',
        family: 'Gnome',
        size: 'small',
        asi: {
            [INT]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'goblin',
        name: 'Goblin',
        size: 'small',
        asi: {
            [DEX]: 2,
            [CON]: 1
        }
    },
    {
        id: 'goliath',
        name: 'Goliath',
        asi: {
            [STR]: 2,
            [CON]: 1
        }
    },
    {
        id: 'halfing-stout',
        name: 'Halfling (stout)',
        family: 'Halfling',
        size: 'small',
        asi: {
            [DEX]: 2,
            [CON]: 1
        }
    },
    {
        id: 'halfling-lightfoot',
        name: 'Halfling (lightfoot)',
        family: 'Halfling',
        size: 'small',
        asi: {
            [DEX]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'halfling-ghostwise',
        name: 'Halfling (ghostwise)',
        family: 'Halfling',
        size: 'small',
        asi: {
            [DEX]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'half-orc',
        name: 'Half-orc',
        asi: {
            [STR]: 2,
            [CON]: 1
        }
    },
    {
        id: 'hobgoblin',
        name: 'Hobgoblin',
        asi: {
            [CON]: 2,
            [INT]: 1
        }
    },
    {
        id: 'human',
        name: 'Human',
        family: 'Human',
        asi: {
            [STR]: 1,
            [DEX]: 1,
            [CON]: 1,
            [INT]: 1,
            [WIS]: 1,
            [CHA]: 1
        }
    },
    {
        id: 'kenku',
        name: 'Kenku',
        asi: {
            [DEX]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'kobold',
        name: 'Kobold',
        size: 'small',
        asi: {
            [DEX]: 2,
            [STR]: -2
        }
    },
    {
        id: 'lizardfolk',
        name: 'Lizardfolk',
        asi: {
            [CON]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'orc',
        name: 'Orc',
        asi: {
            [STR]: 2,
            [CON]: 1,
            [INT]: -2
        }
    },
    {
        id: 'tabaxi',
        name: 'Tabaxi',
        asi: {
            [DEX]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'tortle',
        name: 'Tortle',
        asi: {
            [STR]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'triton',
        name: 'Triton',
        asi: {
            [STR]: 1,
            [CON]: 1,
            [WIS]: 1
        }
    },
    {
        id: 'yuan-ti',
        name: 'Yuan-ti Pureblood',
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
].sort((a, b) => a.name.localeCompare(b.name))

const raceFamilies = {}
RACES.forEach(race => {
    if (race.family) {
        var familyList = raceFamilies[race.family]
        if (!familyList)
            familyList = raceFamilies[race.family] = []
        familyList.push(race)
    } else {
        raceFamilies[race.name] = race
    }
})

export const GROUPED_RACES = Object.keys(raceFamilies).sort().map(raceFamilyKey => {
    return {
        familyName: raceFamilyKey,
        races: raceFamilies[raceFamilyKey]
    }
})

export function featMeetsPrerequisite(featId, characterState) {
    const { race, level, abilityScores } = characterState
    switch (featId) {
        case 'dragon-fear':
        case 'dragon-hide':
        return race.id === 'dragonborn'

        case 'elven-accuracy':
        return race.family === 'Elf' || race.id === 'half-elf'

        case 'flames-phlegethos':
        case 'infernal-constitution':
        return race.family === 'Tiefling'

        case 'orcish-fury':
        return race.id === 'half-orc'

        case 'fey-teleportation':
        return race.id === 'elf-high'

        case 'second-chance':
        return race.family === 'Halfling'

        case 'squat-nimbleness':
        return race.family === 'Dwarf' || race.size === 'small'

        case 'dwarven-fortitude':
        return race.family === 'Dwarf'

        case 'fade-away':
        return race.family === 'Gnome'

        default:
        return true
    }
}

export const FEATS = [
    {
        id: 'actor',
        name: 'Actor',
        asi: {
            [CHA]: 1
        }
    },
    {
        id: 'athlete',
        name: 'Athlete',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        id: 'dragon-fear',
        name: 'Dragon Fear',
        asi: {
            'other': [STR, CON, CHA]
        }
    },
    {
        id: 'dragon-hide',
        name: 'Dragon Hide',
        asi: {
            'other': [STR, CON, CHA]
        }
    },
    {
        id: 'elven-accuracy',
        name: 'Elven Accuracy',
        asi: {
            'other': [DEX, INT, WIS, CHA]
        }
    },
    {
        id: 'flames-phlegethos',
        name: 'Flames of Phlegethos',
        asi: {
            'other': [INT, CHA]
        }
    },
    {
        id: 'linguist',
        name: 'Linguist',
        asi: {
            [INT]: 1
        }
    },
    {
        id: 'keen-mind',
        name: 'Keen Mind',
        asi: {
            [INT]: 1
        }
    },
    {
        id: 'lightly-armored',
        name: 'Lightly Armored',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        id: 'moderately-armored',
        name: 'Moderately Armored',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        id: 'weapon-master',
        name: 'Weapon Master',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        id: 'orcish-fury',
        name: 'Orcish Fury',
        asi: {
            'other': [STR, CON]
        }
    },
    {
        id: 'tavern-brawler',
        name: 'Tavern Brawler',
        asi: {
            'other': [STR, CON]
        }
    },
    {
        id: 'second-chance',
        name: 'Second Chance',
        asi: {
            'other': [DEX, CON, CHA]
        }
    },
    {
        id: 'squat-nimbleness',
        name: 'Squat Nimbleness',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        id: 'infernal-constitution',
        name: 'Infernal Constitution',
        asi: {
            [CON]: 1
        }
    },
    {
        id: 'heavy-armor-master',
        name: 'Heavy Armor Master',
        asi: {
            [STR]: 1
        }
    },
    {
        id: 'heavily-armored',
        name: 'Heavily Armored',
        asi: {
            [STR]: 1
        }
    },
    {
        id: 'durable',
        name: 'Durable',
        asi: {
            [CON]: 1
        }
    },
    {
        id: 'observant',
        name: 'Observant',
        asi: {
            'other': [INT, WIS]
        }
    },
    {
        id: 'resilient',
        name: 'Resilient',
        asi: {
            'other': 1
        }
    },
    {
        id: 'fade-away',
        name: 'Fade Away',
        asi: {
            'other': [DEX, INT]
        }
    },
    {
        id: 'dwarven-fortitude',
        name: 'Dwarven Fortitude',
        asi: {
            [CON]: 1
        }
    },
    {
        id: 'fey-teleportation',
        name: 'Fey Teleportation',
        asi: {
            'other': [INT, CHA]
        }
    }
].sort((a, b) => a.name.localeCompare(b.name))
