import { traits } from "~/helpers/Constants.js"

export default class ActorDropValidator {

  #params = void 0;

  constructor(params) {
    console.log(params);
    this.#params = params;
    console.log(this.#params);
    // this.super.constructor(params)
  }

  itemHasCode() {
    const valid = Boolean(this.#params.item.system.code);
    if (!valid) {
      ui.notifications.notify("Dropped Trait is missing its `code` value and thus invalid.", "error")
    }
    return valid
  }

  isProcessableDropType() {
    return traits.includes(this.#params.item.type)
  }

  droppedItemHasPrerequisites() {
    return this.#params.item.system.reqs.value
  }

  actorHasSufficientXpForDrop() {
    const unspentXp = this.#params.actor.system.xpUnspent;
    const dropCost = this.#params.item.system.xpOffset
    const valid = dropCost <= unspentXp;
    if (!valid) {
      ui.notifications.notify("Actor does not have sufficient unspent XP available to acquire this Trait", "error")
    }
    return valid
  }

  actorMeetsPrerequisites() {

    switch (this.#params.item.system.reqs.type) {
      case "any":
        return this.meetsAnyPrerequisite()
      case "some":
        return this.meetsSomePrerequisites(this.#params.item.system.reqs.min)
      case "all":
        return this.meetsAllPrerequisites(this.#params.item.system.reqs.min)
      default:
        return true
    }
  }

  meetsAllPrerequisites() {
    const prereqs = this.#params.item.system.reqs
    const valid = this.#params.item.system.reqs.list.reduce((valid, req) => {
      if (!valid) return false;
      return Boolean(this.#params.actor.items.find(i => {
        return i.system.code === req.code
      }))
    }, true)
    if (!valid) {
      ui.notifications.notify("Actor does not meet all the prerequisites to acquire this Trait.", "error")
    }
    return valid
  }
  meetsSomePrerequisites(count) {
    const prereqs = this.#params.item.system.reqs
    const validCount = this.#params.item.system.reqs.list.reduce((validCount, req) => {
      const valid = Boolean(this.#params.actor.items.find(i => {
        return i.system.code === req.code
      }))
      if (valid) validCount++
      return validCount
    }, 0)
    if (validCount < count) {
      ui.notifications.notify("Actor does not meet the prerequisites to acquire this Trait.", "error")
    }
    return validCount >= count
  }
  meetsAnyPrerequisite() {
    const prereqs = this.#params.item.system.reqs
    const valid = this.#params.item.system.reqs.list.reduce((valid, req) => {
      if (valid) return true;
      return Boolean(this.#params.actor.items.find(i => {
        return i.system.code === req.code
      }))
    }, false)
    if (!valid) {
      ui.notifications.notify("Actor does not meet the prerequisites to acquire this Trait.", "error")
    }
    return valid
  }

  isDuplicateTrait() {
    const foundDuplicate = this.#params.actor.items.filter(i => {
      return i.system.code === this.#params.item.system.code && i.name === this.#params.item.name
    })
    if (foundDuplicate) {
      ui.notifications.notify("Actor already has this Trait.", "error")
    }
    return foundDuplicate
  }

  validate() {
    if (!this.isProcessableDropType()) return true
    if (!this.itemHasCode()) return false
    if (this.isDuplicateTrait()) return false
    if (!this.actorHasSufficientXpForDrop()) return false
    if (!this.droppedItemHasPrerequisites()) return true
    if (!this.actorMeetsPrerequisites()) return false

    return true
  }
}