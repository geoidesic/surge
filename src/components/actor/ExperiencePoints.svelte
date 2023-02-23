<script>
  //- produces calculations for the character as a whole based on XP
  import { getContext, onMount } from "svelte";
  import { lvlCost } from "~/helpers/Constants.js";
  import XPcalc from "~/helpers/XPcalc.js";
  const XP = new XPcalc($doc);

  export let className = "unspent";

  const doc = getContext("#doc");
  const templates = getContext("#templates");

  $: itemXp =
    $doc.items.reduce((sum, item) => {
      sum += parseInt(item.system.xp);
      return sum;
    }, 0) || 0;

  $: attributeXp =
    Object.entries(templates.Actor.templates.attributes).reduce((acc = 0, [key, value]) => {
      const xpVal = parseInt($doc.system[key].xp) || 0;
      acc = acc + xpVal;
      return acc;
    }, 0) || 0;

  $: xpUnspent = parseInt($doc.system.xpUnspent) || 0;
  $: xpSpent = itemXp + attributeXp;

  $: level = Math.floor(xpSpent / parseInt(lvlCost));
</script>

<template lang="pug">
  +if("className == 'spent'")
    .xp {xpSpent}
    +elseif("className == 'attribute'")
      .xp {attributeXp}
    +elseif("className == 'level'")
      .xp {level}
    +else()
      .xp(class="{classes}") {xpUnspent}
</template>

<style lang="scss" scoped>
</style>
