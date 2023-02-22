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