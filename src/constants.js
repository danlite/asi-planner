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
    barbarian: {
        name: 'Barbarian',
        color: 'd87860',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
        },
        subclassLevel: 3,
        subclasses: {
            ancestral: {
                name: 'Path of the Ancestral [Guardian]',
                capabilities: { 10: ['spellcasting'] },
            },
            battlerager: {
                name: 'Path of the [Battlerager]',
            },
            berserker: {
                name: 'Path of the [Berserker]',
            },
            storm: {
                name: 'Path of the [Storm] Herald',
            },
            totem: {
                name: 'Path of the [Totem] Warrior',
                capabilities: { spellcasting: true },
            },
            zealot: {
                name: 'Path of the [Zealot]',
            },
        },
    },
    bard: {
        name: 'Bard',
        color: 'a878a8',
        capabilities: {
            lightArmorProficiency: true,
            spellcasting: true,
        },
        subclassLevel: 3,
        subclasses: {
            glamour: {
                name: 'College of [Glamour]',
            },
            lore: {
                name: 'College of [Lore]',
            },
            swords: {
                name: 'College of [Swords]',
                capabilities: { mediumArmorProficiency: true },
            },
            valor: {
                name: 'College of [Valor]',
                capabilities: { mediumArmorProficiency: true },
            },
            whispers: {
                name: 'College of [Whispers]',
            },
        },
    },
    cleric: {
        name: 'Cleric',
        color: '909090',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            heavyArmorProficiency: false, // 1st level: Forge / Life / Nature / Tempest / Order
            spellcasting: true,
        },
        subclassLevel: 1,
        subclasses: {

        },
    },
    druid: {
        name: 'Druid',
        color: '909060',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            spellcasting: true,
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    fighter: {
        name: 'Fighter',
        color: '604830',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            heavyArmorProficiency: true,
            spellcasting: false, // 3rd level: Eldritch Knight
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    monk: {
        name: 'Monk',
        color: '78c0d8',
        capabilities: {
            spellcasting: false, // 3rd level: Shadow(?) / Four Elements / Sun Soul(?)
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    paladin: {
        name: 'Paladin',
        color: 'c0a860',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            heavyArmorProficiency: true,
            spellcasting: false, // 2nd level
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    ranger: {
        name: 'Ranger',
        color: '487860',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            spellcasting: false, // 2nd level
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    rogue: {
        name: 'Rogue',
        color: '484848',
        capabilities: {
            lightArmorProficiency: true,
            spellcasting: false, // 3rd level: Arcane Trickster
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    sorcerer: {
        name: 'Sorcerer',
        color: 'c06060',
        capabilities: {
            spellcasting: true,
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    warlock: {
        name: 'Warlock',
        color: '7848a8',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: false, // 2nd level: Hexblade
            spellcasting: true,
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
    wizard: {
        name: 'Wizard',
        color: '4878c0',
        capabilities: {
            lightArmorProficiency: false, // 2nd level: Bladesinging / School of Invention
            spellcasting: true,
        },
        subclassLevel: 0,
        subclasses: {

        },
    },
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
        family: 'Half-elf',
        asi: {
            [CHA]: 2,
            'other': { 1: 2 }
        }
    },
    {
        id: 'half-elf-wood',
        name: 'Half-elf (wood)',
        family: 'Half-elf',
        asi: {
            [CHA]: 2,
            'other': { 1: 2 }
        }
    },
    {
        id: 'half-elf-high',
        name: 'Half-elf (high)',
        family: 'Half-elf',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            'other': { 1: 2 }
        }
    },
    {
        id: 'half-elf-drow',
        name: 'Half-elf (drow)',
        family: 'Half-elf',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            'other': { 1: 2 }
        }
    },
    {
        id: 'half-elf-aquatic',
        name: 'Half-elf (aquatic)',
        family: 'Half-elf',
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
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'aasimar-scourge',
        name: 'Aasimar (scourge)',
        family: 'Aasimar',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [CON]: 1
        }
    },
    {
        id: 'aasimar-fallen',
        name: 'Aasimar (fallen)',
        family: 'Aasimar',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [STR]: 1
        }
    },
    {
        id: 'aasimar-variant',
        name: 'Aasimar (variant)',
        family: 'Aasimar',
        capabilities: { spellcasting: true },
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
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
        },
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'duergar',
        name: 'Duergar (gray dwarf)',
        family: 'Dwarf',
        capabilities: { 3: ['spellcasting'] },
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'elf-high',
        name: 'Elf (high)',
        family: 'Elf',
        capabilities: { spellcasting: true },
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
        capabilities: { spellcasting: true },
        asi: {
            [DEX]: 2,
            [CHA]: 1
        }
    },
    {
        id: 'eladrin-variant',
        name: 'Eladrin (variant)',
        family: 'Elf',
        capabilities: { spellcasting: true },
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
        capabilities: { spellcasting: true },
        asi: {
            [DEX]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling',
        name: 'Tiefling',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-baalzebul',
        name: 'Tiefling (Baalzebul)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-dispater',
        name: 'Tiefling (Dispater)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'tiefling-fierna',
        name: 'Tiefling (Fierna)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'tiefling-glasya',
        name: 'Tiefling (Glasya)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'tiefling-levistus',
        name: 'Tiefling (Levistus)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [CON]: 1
        }
    },
    {
        id: 'tiefling-mammon',
        name: 'Tiefling (Mammon)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-mephistopheles',
        name: 'Tiefling (Mephistopheles)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [INT]: 1
        }
    },
    {
        id: 'tiefling-zariel',
        name: 'Tiefling (Zariel)',
        family: 'Tiefling',
        capabilities: { spellcasting: true },
        asi: {
            [CHA]: 2,
            [STR]: 1
        }
    },
    {
        id: 'firbolg',
        name: 'Firbolg',
        capabilities: { spellcasting: true },
        asi: {
            [WIS]: 2,
            [STR]: 1
        }
    },
    {
        id: 'genasi-air',
        name: 'Genasi (air)',
        family: 'Genasi',
        capabilities: { spellcasting: true },
        asi: {
            [CON]: 2,
            [DEX]: 1
        }
    },
    {
        id: 'genasi-earth',
        name: 'Genasi (earth)',
        family: 'Genasi',
        capabilities: { spellcasting: true },
        asi: {
            [CON]: 2,
            [STR]: 1
        }
    },
    {
        id: 'genasi-fire',
        name: 'Genasi (fire)',
        family: 'Genasi',
        capabilities: { spellcasting: true },
        asi: {
            [CON]: 2,
            [INT]: 1
        }
    },
    {
        id: 'genasi-water',
        name: 'Genasi (water)',
        family: 'Genasi',
        capabilities: { spellcasting: true },
        asi: {
            [CON]: 2,
            [WIS]: 1
        }
    },
    {
        id: 'githyanki',
        name: 'Githyanki',
        family: 'Gith',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            spellcasting: true
        },
        asi: {
            [STR]: 2,
            [INT]: 1
        }
    },
    {
        id: 'githzerai',
        name: 'Githzerai',
        family: 'Gith',
        capabilities: { spellcasting: true },
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
        capabilities: { spellcasting: true },
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
        capabilities: { lightArmorProficiency: true },
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
        capabilities: { spellcasting: true },
        asi: {
            [STR]: 1,
            [CON]: 1,
            [WIS]: 1
        }
    },
    {
        id: 'yuan-ti',
        name: 'Yuan-ti Pureblood',
        capabilities: { spellcasting: true },
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
    const { race, abilityScores, capabilities } = characterState
    switch (featId) {
        case 'dragon-fear':
        case 'dragon-hide':
        return race.id === 'dragonborn'

        case 'elven-accuracy':
        return race.family === 'Elf' || race.family === 'Half-elf'

        case 'flames-of-phlegethos':
        case 'infernal-constitution':
        return race.family === 'Tiefling'

        case 'orcish-fury':
        return race.id === 'half-orc'

        case 'fey-teleportation':
        return race.id === 'elf-high'

        case 'second-chance':
        case 'bountiful-luck':
        return race.family === 'Halfling'

        case 'squat-nimbleness':
        return race.family === 'Dwarf' || race.size === 'small'

        case 'dwarven-fortitude':
        return race.family === 'Dwarf'

        case 'fade-away':
        return race.family === 'Gnome'

        case 'drow-high-magic':
        return race.id === 'drow'

        case 'svirfneblin-magic':
        return race.id === 'gnome-deep'

        case 'wood-elf-magic':
        return race.id === 'elf-wood'

        case 'prodigy':
        return race.family === 'Human' || race.family === 'Half-elf' || race.id === 'half-orc'

        case 'defensive-duelist':
        return abilityScores[DEX] >= 13

        case 'grappler':
        return abilityScores[STR] >= 13

        case 'inspiring-leader':
        return abilityScores[CHA] >= 13

        case 'skulker':
        return abilityScores[DEX] >= 13

        case 'ritual-caster':
        return abilityScores[INT] >= 13 || abilityScores[WIS] >= 13

        case 'elemental-adept-acid':
        case 'elemental-adept-cold':
        case 'elemental-adept-fire':
        case 'elemental-adept-lightning':
        case 'elemental-adept-thunder':
        case 'spell-sniper':
        case 'war-caster':
        return !!capabilities.spellcasting

        case 'moderately-armored':
        return !!capabilities.lightArmorProficiency

        case 'heavily-armored':
        case 'medium-armor-master':
        return !!capabilities.mediumArmorProficiency

        case 'heavy-armor-master':
        return !!capabilities.heavyArmorProficiency

        default:
        return true
    }
}

export const FEATS = [
    {
        name: 'Actor',
        asi: {
            [CHA]: 1
        }
    },
    {
        name: 'Athlete',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        name: 'Dragon Fear',
        asi: {
            'other': [STR, CON, CHA]
        }
    },
    {
        name: 'Dragon Hide',
        asi: {
            'other': [STR, CON, CHA]
        }
    },
    {
        name: 'Elven Accuracy',
        asi: {
            'other': [DEX, INT, WIS, CHA]
        }
    },
    {
        name: 'Flames of Phlegethos',
        asi: {
            'other': [INT, CHA]
        }
    },
    {
        name: 'Linguist',
        asi: {
            [INT]: 1
        }
    },
    {
        name: 'Keen Mind',
        asi: {
            [INT]: 1
        }
    },
    {
        name: 'Lightly Armored',
        asi: {
            'other': [STR, DEX]
        },
        capabilities: { lightArmorProficiency: true }
    },
    {
        name: 'Moderately Armored',
        asi: {
            'other': [STR, DEX]
        },
        capabilities: { mediumArmorProficiency: true }
    },
    {
        name: 'Weapon Master',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        name: 'Orcish Fury',
        asi: {
            'other': [STR, CON]
        }
    },
    {
        name: 'Tavern Brawler',
        asi: {
            'other': [STR, CON]
        }
    },
    {
        name: 'Second Chance',
        asi: {
            'other': [DEX, CON, CHA]
        }
    },
    {
        name: 'Squat Nimbleness',
        asi: {
            'other': [STR, DEX]
        }
    },
    {
        name: 'Infernal Constitution',
        asi: {
            [CON]: 1
        }
    },
    {
        name: 'Heavy Armor Master',
        asi: {
            [STR]: 1
        }
    },
    {
        name: 'Heavily Armored',
        asi: {
            [STR]: 1
        },
        capabilities: { heavyArmorProficiency: true }
    },
    {
        name: 'Durable',
        asi: {
            [CON]: 1
        }
    },
    {
        name: 'Observant',
        asi: {
            'other': [INT, WIS]
        }
    },
    {
        name: 'Resilient',
        asi: {
            'other': 1
        }
    },
    {
        name: 'Fade Away',
        asi: {
            'other': [DEX, INT]
        }
    },
    {
        name: 'Dwarven Fortitude',
        asi: {
            [CON]: 1
        }
    },
    {
        name: 'Fey Teleportation',
        asi: {
            'other': [INT, CHA]
        }
    },
    {
        name: 'Drow High Magic',
        capabilities: { spellcasting: true }
    },
    {
        name: 'Magic Initiate',
        capabilities: { spellcasting: true }
    },
    {
        name: 'Ritual Caster',
        capabilities: { spellcasting: true }
    },
    {
        name: 'Svirfneblin Magic',
        capabilities: { spellcasting: true }
    },
    {
        name: 'Wood Elf Magic',
        capabilities: { spellcasting: true }
    },
].concat(
    [
        'Alert',
        'Bountiful Luck',
        'Charger',
        'Crossbow Expert',
        'Defensive Duelist',
        'Dual Wielder',
        'Dungeon Delver',
        'Elemental Adept (acid)',
        'Elemental Adept (cold)',
        'Elemental Adept (fire)',
        'Elemental Adept (lightning)',
        'Elemental Adept (thunder)',
        'Grappler',
        'Great Weapon Master',
        'Healer',
        'Inspiring Leader',
        'Lucky',
        'Mage Slayer',
        'Martial Adept',
        'Medium Armor Master',
        'Mobile',
        'Mounted Combatant',
        'Polearm Master',
        'Prodigy',
        'Savage Attacker',
        'Sentinel',
        'Sharpshooter',
        'Shield Master',
        'Skilled',
        'Skulker',
        'Spell Sniper',
        'Tough',
        'War Caster',
    ].map(name => ({ name }))
).map(feat => ({
    id: feat.name.toLowerCase().replace(/[^a-zA-Z]+/g, '-').replace(/-$/, ''),
    ...feat
})).sort((a, b) => a.name.localeCompare(b.name))
