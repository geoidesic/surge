<script>
  import { getContext } from "svelte";

  export let className = "txt";

  const doc = getContext("#doc");

  $: inventoryWeight = $doc.items.reduce((sum, item) => {
    sum += parseFloat(item.system.weight) || 0 * parseInt(item.system.quantity) || 0;
    return sum;
  }, 0);

  $: ENC = (inventoryWeight / parseFloat($doc.system.STR) / ($doc.system.siz.level * $doc.system.siz.level)).toFixed(1);

  $: ENCcalc = isNaN(ENC) ? 0 : ENC; //- prevents empty inventory from rendering NaN on sheet

  $: encumbrance =
    ENC > 1 && ENC <= 2
      ? "light"
      : ENC > 2 && ENC <= 4
      ? "medium"
      : ENC > 4 && ENC <= 5
      ? "heavy"
      : ENC > 5
      ? "immobile"
      : "none";

  $: classes = encumbrance + " " + className;
</script>

<template lang="pug">
  +if("className == 'value'")
    .enc {ENCcalc}
    +elseif("className == 'total'")
      .enc {inventoryWeight}
    +else()
      .enc(class="{classes}") {encumbrance}
</template>

<style lang="scss" scoped>
  .bg {
    border: 1px solid grey;
    border-radius: 3px;
    color: white;
    &.none {
      background-color: var(--enc-none);
    }
    &.light {
      background-color: var(--enc-light);
    }
    &.medium {
      background-color: var(--enc-medium);
    }
    &.heavy {
      background-color: var(--enc-heavy);
    }
    &.immobile {
      background-color: var(--enc-immobile);
    }
  }
  .txt {
    &.none {
      color: var(--enc-none);
    }
    &.light {
      color: var(--enc-light);
    }
    &.medium {
      color: var(--enc-medium);
    }
    &.heavy {
      color: var(--enc-heavy);
    }
    &.immobile {
      color: var(--enc-immobile);
    }
  }
</style>
