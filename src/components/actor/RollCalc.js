import { isNumber } from "../../helpers/Utility";
export default class RollCalc {


  #params = void 0;

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

    //- targeted tokens
    console.log(Array.from(game.user.targets));
    const targets = Array.from(game.user.targets);
    //- selected tokens
    // console.log(canvas.tokens.controlled);
    return [!!targets?.length || false, targets]
  }

  async roll(level = Number(this.#params?.level) || 0, noOfDice = 1) {
    level = Number(level);

    const die = this.getLevelDie(level);
    console.log(level);
    console.log(die);
    const roll = new Roll(`${noOfDice}d${die}`);
    console.log(roll)
    await roll.roll();
    const result = roll.result
    console.log(die)
    console.log(result)
    console.log({ result, die })
    return { result, die, noOfDice }
  }

  createChatMessage(props) {
    ChatMessage.create({
      user: game.user.id,
      flags: {
        'surge': {        // Use your module ID instead of `essential-svelte-esm`.
          data: { ...props, doc: this.#params.doc }
        }
      }
    });
  }

  //- rolls for an Attribute
  async attribute(Actor, code) {
    console.log(Actor);
    const { result, die, noOfDice } = await this.roll(Actor.system[code], 1)
    console.log(result)
    console.log(die)
    const message = { thingys: [], code: this.#params.code, noOfDice, result, die, chatTemplate: 'AttributeRollChat' };
    let [isContest, targets] = this.isContest();
    console.log(isContest);
    console.log(targets);
    if (isContest) {
      for (const token of targets) {
        console.log(token.actor.system[code])
        const { r, d, n } = await this.roll(token.actor.system[code], 1);
        message.thingys.push({ token, r, d, n });
      }
    }
    console.log(message);
    this.createChatMessage(message);
  }

  //- rolls for a SubAttribute
  async subAttribute(Actor, code) {
    console.log(Actor);
    console.log(code);
    const { result, die } = await this.roll(Actor.system[code].level, 1)
    this.createChatMessage({ code: this.#params.code, die, result, chatTemplate: 'SubAttributeRollChat' })
  }
  //- rolls for a Traits
  async trait(Item, code) {
    const { result, die } = await this.roll(Item.system[code], 1)
    this.createChatMessage({ Item, Actor: this.#params.Actor, code: this.#params.code, result, die, chatTemplate: 'TraitRollChat' });
  };

  //- rolls for a Traits
  async inventory(Item, code) {
    if (!this.isContest()) {
      console.log('NO CONTEST')
      console.log(Item.system[code])
      const { result, die } = await this.roll(Item.system[code], 1)
      this.createChatMessage({ Item, Actor: this.#params.Actor, code: this.#params.code, result, die, chatTemplate: 'InventoryRollChat' });
    } else {
      const { result, die } = await this.roll(Item.system[code], 1)
      const results = Array.from(game.user.targets).map((target) => {
        return this.roll(target.system.DEX, 1);
      });
      this.createChatMessage({ Item, Actor: this.#params.Actor, code: this.#params.code, result, die, targetResults: results, chatTemplate: 'ContestedInventoryRollChat' });
    }
  }
}

