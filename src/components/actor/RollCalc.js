
export default class RollCalc {


  #roll = void 0;
  #params = void 0;
  #result = void 0;
  #noOfDice = void 0;
  #die = void 0;

  constructor(params) {
    console.log(params);
    this.#params = params;

    if (params.rollType) this[params.rollType](this.#params.doc, this.#params.code)
  }

  getLevelDie(level) {
    level = level ? level : this.#params.level;
    return level == 0 ? 2 : (level + 1) * 2;
  }

  async roll(level, noOfDice = 1) {
    level = level ? level : this.#params.level;
    this.#noOfDice = noOfDice;
    this.#die = this.getLevelDie(level);
    this.#roll = new Roll(`${this.#noOfDice}d${this.#die}`);
    await this.#roll.roll();
    this.#result = this.#roll.result
    return this.#result;
  }

  //- rolls for an Attribute
  async attribute(Actor, code) {
    console.log(Actor);
    this.roll(Actor.system[code], 1)
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { doc: this.#params.doc, code: this.#params.code, chatTemplate: 'AttributeRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }
  //- rolls for a SubAttribute
  async subAttribute(Actor, code) {
    this.roll(Actor.system[code].level, 1)
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { doc: this.#params.doc, code: this.#params.code, chatTemplate: 'SubAttributeRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }
  //- rolls for a Traits
  async trait(Item, code) {
    this.roll(Item.system[code].level, 1)
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { doc: this.#params.doc, code: this.#params.code, chatTemplate: 'TraitRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }
  //- rolls for a Traits
  async inventory(Item, code) {
    this.roll(Item.system[code], 1)
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { doc: this.#params.doc, Item, Actor: this.#params.Actor, code: this.#params.code, chatTemplate: 'InventoryRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }

}
