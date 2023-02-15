import { isNumber } from "../../helpers/Utility";
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
    console.log(level);
    console.log(typeof level);
    return level == 0 ? 2 : (level + 1) * 2;
  }

  isContest() {
    return !!canvas.tokens.controlled?.length || false;
  }

  async roll(level, noOfDice = 1) {

    level = isNumber(level) ? parseInt(level) : parseInt(this.#params.level);

    this.#noOfDice = noOfDice;
    this.#die = this.getLevelDie(level);
    this.#roll = new Roll(`${this.#noOfDice}d${this.#die}`);
    await this.#roll.roll();
    this.#result = this.#roll.result
    return this.#result;
  }
  createChatMessage(props) {
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { ...props, doc: this.#params.doc, roll: this.#roll.result, noOfDice: this.#noOfDice, die: this.#die }
        }
      }
    });
  }

  //- rolls for an Attribute
  async attribute(Actor, code) {
    console.log(Actor);
    this.roll(Actor.system[code], 1)
    this.createChatMessage({ code: this.#params.code, chatTemplate: 'AttributeRollChat', })
  }
  //- rolls for a SubAttribute
  async subAttribute(Actor, code) {
    console.log(Actor);
    console.log(code);
    this.roll(Actor.system[code].level, 1)
    this.createChatMessage({ code: this.#params.code, chatTemplate: 'SubAttributeRollChat' })
  }
  //- rolls for a Traits
  async trait(Item, code) {
    this.roll(Item.system[code], 1)
    this.createChatMessage({ Item, Actor: this.#params.Actor, code: this.#params.code, chatTemplate: 'TraitRollChat' });
  };

  //- rolls for a Traits
  async inventory(Item, code) {
    this.roll(Item.system[code], 1)
    this.createChatMessage({ Item, Actor: this.#params.Actor, code: this.#params.code, chatTemplate: 'InventoryRollChat' });
  }
}

