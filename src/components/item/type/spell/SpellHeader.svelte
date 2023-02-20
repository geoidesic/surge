<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
</script>

<template lang="pug">
section.extra-info.flexrow
  .stat
    .input
      DocumentRaritySelect(bind:value='{$doc.system.rarity}')

section.extra-info.flexrow
  div Rarity
</template>

<style lang="scss" scoped>
</style>
