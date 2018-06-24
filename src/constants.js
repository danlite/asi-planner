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

export function formatClassNames(level) {
    const classKeys = Object.keys(level.classes)
    return (
        classKeys.map(_class => `${CLASSES[_class].name} ${level.classes[_class]}`).join(' / ') +
        (classKeys.length > 1 ? ` (${level.characterLevel})` : '')
    )
}

export function formatSubclassName(subclass, short = false) {
    if (short) {
        if (subclass.shortName)
            return subclass.shortName

        const match = subclass.name.match(/\[(.+)\]/)

        if (match)
            return match[1]
    }

    return subclass.name.replace(/[[\]]/g, '')
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
        subclassType: 'Primal Path',
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
        subclassType: 'Bard College',
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
            spellcasting: true,
        },
        subclassLevel: 1,
        subclassType: 'Divine Domain',
        subclasses: {
            arcana: {
                name: '[Arcana] Domain'
            },
            death: {
                name: '[Death] Domain'
            },
            forge: {
                name: '[Forge] Domain',
                capabilities: { heavyArmorProficiency: true }
            },
            grave: {
                name: '[Grave] Domain'
            },
            knowledge: {
                name: '[Knowledge] Domain'
            },
            life: {
                name: '[Life] Domain',
                capabilities: { heavyArmorProficiency: true }
            },
            light: {
                name: '[Light] Domain'
            },
            nature: {
                name: '[Nature] Domain',
                capabilities: { heavyArmorProficiency: true }
            },
            order: {
                name: '[Order] Domain (UA)',
                capabilities: { heavyArmorProficiency: true }
            },
            tempest: {
                name: '[Tempest] Domain',
                capabilities: { heavyArmorProficiency: true }
            },
            trickery: {
                name: '[Trickery] Domain'
            },
            war: {
                name: '[War] Domain'
            },
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
        subclassLevel: 2,
        subclassType: 'Druid Circle',
        subclasses: {
            dreams: {
                name: 'Circle of [Dreams]'
            },
            spores: {
                name: 'Circle of [Spores] (UA)'
            },
            land: {
                name: 'Circle of the [Land]'
            },
            moon: {
                name: 'Circle of the [Moon]'
            },
            shepherd: {
                name: 'Circle of the [Shepherd]'
            },
        },
    },
    fighter: {
        name: 'Fighter',
        color: '604830',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            heavyArmorProficiency: true,
        },
        subclassLevel: 3,
        subclassType: 'Martial Archetype',
        subclasses: {
            arcanearcher: {
                name: '[Arcane Archer]',
                shortName: 'AA',
            },
            battlemaster: {
                name: '[Battle Master]',
                shortName: 'BM',
            },
            brute: {
                name: '[Brute] (UA)'
            },
            cavalier: {
                name: 'Cavalier'
            },
            champion: {
                name: 'Champion'
            },
            eldritch: {
                name: 'Eldritch Knight',
                shortName: 'EK',
                capabilities: { spellcasting: true }
            },
            purpledragon: {
                name: 'Purple Dragon Knight',
                shortName: 'PDK'
            },
            samurai: {
                name: 'Samurai'
            },
        },
    },
    monk: {
        name: 'Monk',
        color: '78c0d8',
        capabilities: {},
        subclassLevel: 3,
        subclassType: 'Monastic Tradition',
        subclasses: {
            shadow: {
                name: 'Way of [Shadow]',
                capabilities: { spellcasting: true }
            },
            drunken: {
                name: 'Way of the [Drunken] Master',
                capabilities: { spellcasting: true }
            },
            fourelements: {
                name: 'Way of the [Four Elements]',
            },
            kensei: {
                name: 'Way of the [Kensei]',
            },
            longdeath: {
                name: 'Way of the [Long Death]',
            },
            openhand: {
                name: 'Way of the [Open Hand]',
            },
            sunsoul: {
                name: 'Way of the [Sun Soul]',
                capabilities: { spellcasting: true }
            },
        },
    },
    paladin: {
        name: 'Paladin',
        color: 'c0a860',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            heavyArmorProficiency: true,
            2: ['spellcasting'],
        },
        subclassLevel: 3,
        subclassType: 'Sacred Oath',
        subclasses: {
            conquest: {
                name: 'Oath of [Conquest]'
            },
            devotion: {
                name: 'Oath of [Devotion]'
            },
            redemption: {
                name: 'Oath of [Redemption]'
            },
            ancients: {
                name: 'Oath of the [Ancients]'
            },
            crown: {
                name: 'Oath of the [Crown]'
            },
            vengeance: {
                name: 'Oath of [Vengeance]'
            },
            oathbreaker: {
                name: 'Oathbreaker'
            },
        },
    },
    ranger: {
        name: 'Ranger',
        color: '487860',
        capabilities: {
            lightArmorProficiency: true,
            mediumArmorProficiency: true,
            2: ['spellcasting'],
        },
        subclassLevel: 3,
        subclassType: 'Ranger Archetype',
        subclasses: {
            beastmaster: {
                name: '[Beast] Master'
            },
            gloomstalker: {
                name: '[Gloom] Stalker'
            },
            horizonwalker: {
                name: '[Horizon] Walker'
            },
            hunter: {
                name: 'Hunter'
            },
            monsterslayer: {
                name: 'Monster [Slayer]'
            },
        },
    },
    rogue: {
        name: 'Rogue',
        color: '484848',
        capabilities: {
            lightArmorProficiency: true,
            spellcasting: false, // 3rd level: Arcane Trickster
        },
        subclassLevel: 3,
        subclassType: 'Roguish Archetype',
        subclasses: {
            arcanetrickster: {
                name: 'Arcane Trickster',
                shortName: 'AT',
                capabilities: { spellcasting: true }
            },
            assassin: {
                name: 'Assassin'
            },
            inquisitive: {
                name: 'Inquisitive'
            },
            mastermind: {
                name: 'Mastermind'
            },
            scout: {
                name: 'Scout'
            },
            swashbuckler: {
                name: 'Swashbuckler'
            },
            thief: {
                name: 'Thief'
            },
        },
    },
    sorcerer: {
        name: 'Sorcerer',
        color: 'c06060',
        capabilities: {
            spellcasting: true,
        },
        subclassLevel: 1,
        subclassType: 'Sorcerous Origin',
        subclasses: {
            divine: {
                name: '[Divine] Soul'
            },
            draconic: {
                name: '[Draconic] Bloodline'
            },
            giant: {
                name: '[Giant] Soul (UA)'
            },
            shadow: {
                name: '[Shadow] Magic'
            },
            storm: {
                name: '[Storm] Sorcery'
            },
            wild: {
                name: '[Wild] Magic'
            },
        },
    },
    warlock: {
        name: 'Warlock',
        color: '7848a8',
        capabilities: {
            lightArmorProficiency: true,
            spellcasting: true,
        },
        subclassLevel: 1,
        subclassType: 'Otherworldly Patron',
        subclasses: {
            archfey: {
                name: 'The [Archfey]'
            },
            celestial: {
                name: 'The [Celestial]'
            },
            fiend: {
                name: 'The [Fiend]'
            },
            goo: {
                name: 'The Great Old One',
                shortName: 'GOO'
            },
            hexblade: {
                name: 'The [Hexblade]',
                capabilities: { mediumArmorProficiency: true }
            },
            undying: {
                name: 'The [Undying]'
            },
        },
    },
    wizard: {
        name: 'Wizard',
        color: '4878c0',
        capabilities: {
            spellcasting: true,
        },
        subclassLevel: 2,
        subclassType: 'Arcane Tradition',
        subclasses: {
            bladesinging: {
                name: 'Bladesinging',
                capabilities: { lightArmorProficiency: true }
            },
            abjuration: {
                name: 'School of [Abjuration]',
            },
            conjuration: {
                name: 'School of [Conjuration]',
            },
            divination: {
                name: 'School of [Divination]',
            },
            enchantment: {
                name: 'School of [Enchantment]',
            },
            evocation: {
                name: 'School of [Evocation]',
            },
            illusion: {
                name: 'School of [Illusion]',
            },
            invention: {
                name: 'School of [Invention] (UA)',
                capabilities: { lightArmorProficiency: true }
            },
            necromancy: {
                name: 'School of [Necromancy]',
            },
            transmutation: {
                name: 'School of [Transmutation]',
            },
            war: {
                name: '[War] Magic',
            },
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
    {
        id: 'centaur',
        name: 'Centaur (UA)',
        asi: {
            [STR]: 2,
            [WIS]: 1,
        }
    },
    {
        id: 'minotaur',
        name: 'Minotaur (UA)',
        asi: {
            [STR]: 2,
            [CON]: 1,
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
        return race && (race.id === 'dragonborn')

        case 'elven-accuracy':
        return race && (race.family === 'Elf' || race.family === 'Half-elf')

        case 'flames-of-phlegethos':
        case 'infernal-constitution':
        return race && (race.family === 'Tiefling')

        case 'orcish-fury':
        return race && (race.id === 'half-orc')

        case 'fey-teleportation':
        return race && (race.id === 'elf-high')

        case 'second-chance':
        case 'bountiful-luck':
        return race && (race.family === 'Halfling')

        case 'squat-nimbleness':
        return race && (race.family === 'Dwarf' || race.size === 'small')

        case 'dwarven-fortitude':
        return race && (race.family === 'Dwarf')

        case 'fade-away':
        return race && (race.family === 'Gnome')

        case 'drow-high-magic':
        return race && (race.id === 'drow')

        case 'svirfneblin-magic':
        return race && (race.id === 'gnome-deep')

        case 'wood-elf-magic':
        return race && (race.id === 'elf-wood')

        case 'prodigy':
        return race && (race.family === 'Human' || race.family === 'Half-elf' || race.id === 'half-orc')

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
