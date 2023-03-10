
export default class XpCalc {

  #doc = {}

  dir = "";

  constructor($doc) {
    this.#doc = $doc
  }

  /**
   * @param {int} level 
   * @param {int} offset
   * @returns {int} cost
   */
  levelCost(level, offset = 0,) {
    if (parseInt(level) <= 0) return 0;
    return Array.from({ length: parseInt(level) }, (_, i) => i + 1).reduce(
      (sum, current) => parseInt(sum) + parseInt(current) + parseInt(offset),
      0
    );
  };

  directionOfChange(newValue, oldValue) {

    if (typeof newValue != 'number') {
      throw TypeError('@param newValue must be of type number');
    }
    if (isNaN(newValue)) {
      throw Error('directionOfXpChange could not be calculated due to faulty input');
    }
    const currentXpAssignedToTraitOrAttribute = parseInt(oldValue)
    const direction =
      newValue > currentXpAssignedToTraitOrAttribute
        ? "up"
        : newValue < currentXpAssignedToTraitOrAttribute
          ? "down"
          : "same";
    this.dir = direction
    return this.dir;
  }

  level() {
    //- xp - cost fo
    const lvl0Cost = $doc.system.xpOffset;
    const xp = $doc.system.xp;
    if (xp <= lvl0Cost) return 0;
    const level = Array.from({ length: parseInt(xp - lvl0Cost) }, (_, i) => i + 1).reduce((level, current) => {
      if (xp >= this.levelCost(level + 1)) return level + 1;
      return level;
    }, lvl0Cost)
  }

  // /**
  //  * @param {Actor} $doc 
  //  * @param {object} trait 
  //  * @returns {int} cost of next level for given trait
  //  */
  // traitNextLevelCost($doc, trait) {
  //   //- find the currently held level of the trait from the Actor
  //   const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
  //   if (!existingTrait) return trait.system.xpOffset + 1;

  //   //- calculate and return the cost of the next level
  //   const nextLevel = existingTrait ? existingTrait.system.level + 1 : 1;
  //   return levelCost(trait, nextLevel);
  // };

  // /**
  //  * @param {Actor} $doc 
  //  * @param {object} trait 
  //  * @returns {int} cost of previous level for given trait
  //  */
  // traitPreviousLevelCost($doc, trait) {
  //   //- find the currently held level of the trait from the Actor
  //   const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
  //   if (!existingTrait) return 0;

  //   //- calculate and return the cost of the next level
  //   const prevLevel = existingTrait ? existingTrait.system.level - 1 : 1;
  //   return levelCost(trait, prevLevel);
  // };

  // /**
  //  * 
  //  * @param {Actor} $doc 
  //  * @param {object} trait 
  //  * @returns {int} amount of XP released if a trait level is decreased
  //  */
  // releasedXP($doc, trait) {
  //   const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
  //   return existingTrait ? existingTrait.assignedXP - traitPreviousLevelCost(trait) : 0;
  // };
}
