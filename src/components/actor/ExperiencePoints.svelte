<script>
  import { getContext, onMount } from "svelte";
  import { lvlCost } from "~/helpers/Constants.js";
  import XPcalc from "~/components/actor/XPcalc.js";
  const XP = new XPcalc($doc);

  export let className = "unspent";

  const doc = getContext("#doc");
  const templates = getContext("#templates");

  $: itemXp =
    $doc.items.reduce((sum, item) => {
      sum += parseInt(item.system.xpAssigned);
      return sum;
    }, 0) || 0;

  $: attributeXp =
    Object.entries(templates.Actor.templates.attributes).reduce((acc = 0, [key, value]) => {
      // console.log(acc);
      // console.log($doc.system[key].xp);
      const xpVal = parseInt($doc.system[key].xp) || 0;
      // console.log(xpVal);
      // console.log(typeof xpVal);
      // acc = acc + xpVal;
      // console.log(acc);
      return acc;
    }, 0) || 0;

  $: xpUnspent = parseInt($doc.system.xpUnspent) || 0;
  $: xpSpent = itemXp + attributeXp;

  $: level = Math.floor(xpSpent / parseInt(lvlCost));

  onMount(async () => {
    console.log($doc.system.xpUnspent);
    console.log(xpUnspent);
    console.log(attributeXp);
    console.log(itemXp);
  });
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
