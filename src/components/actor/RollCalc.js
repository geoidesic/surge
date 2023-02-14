
export default class RolCalc {


  #level = 0;
  #roll = void 0;
  #doc = void 0;
  #code = void 0;
  #result = void 0;
  #noOfDice = void 0;
  #die = void 0;

  constructor(params) {
    console.log(params);
    if (params.doc) this.#doc = params.doc;
    if (params.level) this.#level = params.level;
    if (params.code) this.#code = params.code;

    if (params.rollType) this[params.rollType](this.#doc, this.#code)
  }

  getLevelDie(level) {
    level = level ? level : this.#level;
    return level == 0 ? 2 : (level + 1) * 2;
  }

  async roll(level, noOfDice = 1) {
    level = level ? level : this.#level;
    this.#noOfDice = noOfDice;
    this.#die = this.getLevelDie(level);
    this.#roll = new Roll(`${this.#noOfDice}d${this.#die}`);
    await this.#roll.roll();
    this.#result = this.#roll.result
    return this.#result;
  }

  //- rolls for an Attribute
  async attribute(Actor, code) {
    this.roll(Actor.system[code], 1)
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { Actor: this.#doc, code: this.#code, chatTemplate: 'AttributeRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
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
          data: { Actor: this.#doc, code: this.#code, chatTemplate: 'SubAttributeRollChat', roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }

}
