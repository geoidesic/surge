export const lvlCost = 30;
export const attributes = {
  str: ["siz", "hid", "mus", "ton", "den"],
  dex: ["spd", "flx", "agl", "bal", "coo"],
  cha: ["com", "pre", "gab", "chr", "sta"],
  int: ["mem", "dsc", "ins", "wil", "cog"],
  per: ["sig", "hea", "sml", "tst", "tch"],
  hlt: ["end", "imm", "ftg", "wnd", "dis"]
}
export const AOEshapes = [
  {
    value: "cone",
    label: "Cone"
  },
  {
    value: "cube",
    label: "cube"
  },
  {
    value: "ray",
    label: "ray"
  },
  {
    value: "cuboid",
    label: "cuboid"
  },
  {
    value: "sphere",
    label: "sphere"
  }
]
export const targets = [
  {
    value: "self",
    label: "self"
  },
  {
    value: "touch",
    label: "touch"
  },
  {
    value: "creature seen",
    label: "creature seen"
  },
]
export const manaTypes = [
  {
    value: "fire",
    label: "fire"
  },
  {
    value: "water",
    label: "water"
  },
  {
    value: "earth",
    label: "earth"
  },
  {
    value: "air",
    label: "air"
  },
  {
    value: "death",
    label: "death"
  },
  {
    value: "spirit",
    label: "spirit"
  },
  {
    value: "chi",
    label: "chi"
  },
  {
    value: "earth",
    label: "earth"
  },
  {
    value: "fey blood",
    label: "fey blood"
  },
  {
    value: "djin blood",
    label: "djin blood"
  },
  {
    value: "efreet blood",
    label: "efreet blood"
  },
  {
    value: "naga blood",
    label: "naga blood"
  },
  {
    value: "infernal blood",
    label: "infernal blood"
  },
  {
    value: "celestial blood",
    label: "celestial blood"
  },
  {
    value: "extra-planar",
    label: "extra-planar"
  },
  {
    value: "infernal blood",
    label: "infernal blood"
  },
  {
    value: "infernal blood",
    label: "infernal blood"
  },
  {
    value: "magic item",
    label: "magic item"
  },
  {
    value: "cosmic",
    label: "cosmic"
  },
]

export const actionTypes = [
  {
    label: "Healing",
    description: "Magic that Magic that restores health and vitality to creatures, either instantly or over time.",
    value: "healing"
  },
  {
    label: "Utility",
    description: "Magic that provides various useful effects, such as creating light, cleaning dirty objects, or repairing broken ones.",
    value: "healing"
  },
  {
    label: "Ranged Weapon Attack",
    description: "Weapon attack which can be used at a distance to attack other creatures or objects.",
    value: "rangedweaponattack"
  },
  {
    label: "Melee Weapon Attack",
    description: "Weapons that are used in close combat.",
    value: "meleeweaponattack"
  },
  {
    label: "Ranged Spell Attack",
    description: " Magic that can be used at a distance to attack other creatures or objects, such as bolts of energy, fiery blasts, or waves of force. This category includes spells that can be used to damage or weaken other creatures from a distance",
    value: "rangedspellattack"
  },
  {
    label: "Melee Spell Attack",
    description: "Magic that is used in close combat, such as by imbuing spells with magical energy, creating shockwaves that knock back enemies, or imbuing the caster's body with magical energy. This category includes spells that can be used to damage or weaken other creatures in close combat.",
    value: "meleespellattack"
  },
]

export const magicSchools = [
  {
    label: "Abjuration",
    description: "Magic that protects, blocks, or banishes.This includes spells like shield and protection from energy.",
    value: "abjuration"
  },
  {
    label: "Conjuration",
    description: "Magic that creates objects, creatures, or effects out of thin air.This includes spells like mage armor and summon monster.",
    value: "conjuration"
  },
  {
    label: "Divination",
    description: "Magic that allows you to gain information, see the unseen, or predict the future.This includes spells like identify and detect magic.",
    value: "divination"
  },
  {
    label: "Enchantment",
    description: "Magic that manipulates the minds of others, influencing their thoughts or emotions.This includes spells like charm person and suggestion.",
    value: "enchantment"
  },
  {
    label: "Evocation",
    description: "Magic that unleashes raw elemental energy to deal damage to enemies.This includes spells like fireball and lightning bolt.",
    value: "evocation"
  },
  {
    label: "Illusion",
    description: "Magic that creates false images or sounds, deceiving the senses of others.This includes spells like invisibility and phantasmal force.",
    value: "illusion"
  },
  {
    label: "Necromancy",
    description: "Magic that deals with life and death, including raising undead creatures and draining the life from others.This includes spells like animate dead and vampiric touch.",
    value: "necromancy"
  },
  {
    label: "Transmutation",
    description: "Magic that alters the physical world, changing or transforming objects and creatures.This includes spells like polymorph and stone shape.",
    value: "transmutation"
  }
]

export const distanceUnits = [
  {
    value: "",
    label: "",
    selected: true
  },
  {
    value: "ft",
    label: "Feet"
  },
  {
    value: "mi",
    label: "Miles"
  },
  {
    value: "m",
    label: "Meters"
  },
  {
    value: "km",
    label: "Kilometers"
  }
]

export const damageTypes = [
  {
    value: "",
    label: "",
    selected: true
  },
  {
    value: "slice",
    label: "Slice"
  },
  {
    value: "cudgel",
    label: "Cudgel"
  },
  {
    value: "impale",
    label: "Impale"
  },
  {
    value: "cold",
    label: "Cold"
  },
  {
    value: "heat",
    label: "Heat"
  },
  {
    value: "flame",
    label: "Flame"
  },
  {
    value: "acid",
    label: "Acid"
  },
  {
    value: "lightning",
    label: "Lightning"
  },
  {
    value: "necrotic",
    label: "Necrotic"
  },
  {
    value: "radiant",
    label: "Radiant"
  },
  {
    value: "poison",
    label: "Poison"
  },
  {
    value: "psychic",
    label: "Psychic"
  },
]

export const durationTypes = [
  {
    value: "",
    label: "",
  },
  {
    value: 'inst',
    label: "Instantaneous",
  },
  {
    value: 'turn',
    label: "Turns",
  },
  {
    value: 'round',
    label: "Rounds",
  },
  {
    value: 'minute',
    label: "Minutes",
  },
  {
    value: 'hour',
    label: "Hours",
  },
  {
    value: 'day',
    label: "Days",
  },
  {
    value: 'month',
    label: "Months",
  },
  {
    value: 'year',
    label: "Years",
  },
  {
    value: 'perm',
    label: "Permanent",
  },
  {
    value: 'spec',
    label: "Special",
  },
]

export const timeUnits = [
  {
    value: "rounds",
    label: "rounds"
  },
  {
    value: "minutes",
    label: "minutes"
  },
  {
    value: "hours",
    label: "hours"
  },
  {
    value: "days",
    label: "days"
  },
]

export const effectTypes = [
  {
    value: "active",
    label: "active"
  },
  {
    value: "passive",
    label: "passive"
  },
]
export const effectStatus = [
  {
    value: "on",
    label: "on"
  },
  {
    value: "off",
    label: "off"
  },
]

export default {
  lvlCost,
  attributes
}