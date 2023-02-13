<script>
  import { getContext } from "svelte";
  import { lvlCost } from "~/helpers/Constants.js";
  import XPcalc from "~/components/actor/XPcalc.js";
  const XP = new XPcalc($doc);

  export let className = "unspent";

  const doc = getContext("#doc");
  const templates = getContext("#templates");

  $: itemXp = () => {
    return (
      $doc.items.reduce((sum, item) => {
        sum += parseInt(item.system.xpAssigned);
        return sum;
      }, 0) || 0
    );
  };

  $: attributeXp = () => {
    return (
      Object.entries(templates.Actor.templates.attributes).reduce((acc, [key, value]) => {
        acc += parseInt($doc.system[key].xp);
        return acc;
      }, 0) || 0
    );
  };

  $: xpUnspent = parseInt($doc.system.xpUnspent);
  $: xpSpent = itemXp() + attributeXp();

  $: level = Math.floor(xpSpent / parseInt(lvlCost));
</script>

<template lang="pug">
  +if("className == 'spent'")
    .xp {xpSpent}
    +elseif("className == 'level'")
      .xp {level}
    +else()
      .xp(class="{classes}") {xpUnspent}
</template>

<style lang="scss" scoped>
</style>
