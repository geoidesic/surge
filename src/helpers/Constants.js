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

export default {
  lvlCost,
  attributes
}