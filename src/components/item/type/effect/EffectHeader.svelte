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

section.extra-info.flexrow

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .extra-info {
    @include sheetHeader;
  }
</style>
