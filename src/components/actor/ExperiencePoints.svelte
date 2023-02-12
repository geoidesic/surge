<script>
  import { getContext } from "svelte";
  import { lvlCost } from "~/helpers/Constants.js";

  export let className = "unspent";

  const doc = getContext("#doc");
  console.log($doc);
  console.log($doc.system);
  console.log($doc.system.unspentXP);

  const traitLevelCost = function (trait, level) {
    if (level <= 0) return 0;
    return Array.from({ length: level + trait.system.xpOffset }, (_, i) => i + 1).reduce(
      (sum, current) => sum + current,
      0
    );
  };

  const traitNextLevelCost = function (trait) {
    //- find the currently held level of the trait from the Actor
    const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
    if (!existingTrait) return trait.system.xpOffset + 1;

    //- calculate and return the cost of the next level
    const nextLevel = existingTrait ? existingTrait.system.level + 1 : 1;
    return traitLevelCost(trait, nextLevel);
  };

  const traitPreviousLevelCost = function (trait) {
    //- find the currently held level of the trait from the Actor
    const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
    if (!existingTrait) return 0;

    //- calculate and return the cost of the next level
    const prevLevel = existingTrait ? existingTrait.system.level - 1 : 1;
    return traitLevelCost(trait, prevLevel);
  };

  const releasedXP = function (trait) {
    const existingTrait = $doc.items.find((t) => (t.name = trait.name)) || false;
    return existingTrait ? existingTrait.assignedXP - traitPreviousLevelCost(trait) : 0;
  };

  $: spentXP =
    $doc.items.reduce((sum, item) => {
      sum += parseFloat(item.system.assignedXP);
      return sum;
    }, 0) || 0;

  $: level = Math.floor(spentXP / parseInt(lvlCost));
</script>

<template lang="pug">
  +if("className == 'spent'")
    .xp {spentXP}
    +elseif("className == 'level'")
      .xp {level}
    +else()
      .xp(class="{classes}") {unspentXP}
</template>

<style lang="scss" scoped>
</style>
