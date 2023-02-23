<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import XPcalc from "~/helpers/XPcalc.js";

  import { getContext } from "svelte";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
section.extra-info.flexrow
  +if("parentIsActor")
    .stat.pa-xs {XPcalc($doc).level()}
  .stat.pa-xs {$doc.system.capacity} {$doc.system.capacityUnits}
  .stat.pa-xs {$doc.system.rarity}

section.extra-info.flexrow
  +if("parentIsActor")
    label Level (AF)
  label Capacity
  label Rarity

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .extra-info {
    @include sheetHeader;
  }
</style>
