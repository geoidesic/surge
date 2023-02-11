<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
</script>

<template lang="pug">
section.extra-info.flexrow
  DocInput(className="md transparent" attr="system.size" placeholder="Size" maxlength="40")
  .stat
    // Label
    //- .label rarity

    // Input
    .input
      DocumentRaritySelect(bind:value='{$doc.system.rarity}')

  DocInput(className="md transparent" attr="system.AP" placeholder="0" maxlength="40" inputType="number")
  DocInput(className="md transparent" attr="system.AF" placeholder="0" maxlength="40" inputType="number")
section.extra-info.flexrow
  div Size
  div Rarity
  div Action Points
  div Action Factor
</template>

<style lang="scss" scoped>
</style>
