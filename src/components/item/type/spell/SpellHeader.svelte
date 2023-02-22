<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { TJSSelect } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import { manaTypes } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
</script>

<template lang="pug">
section.extra-info.flexrow
//-   .stat
//-     .input
//-       DocumentRaritySelect(bind:value='{$doc.system.rarity}')
//-   .stat
//-     .input
//-       select(bind:value="{$doc.system.manaType}")
//-         +each("manaTypes as manaType")
//-           option(value="{manaType.value}") {manaType.label}

//- section.extra-info.flexrow
//-   div Rarity
//-   div Mana Type
</template>

<style lang="scss" scoped>
  .extra-info {
    gap: 2px;
  }
</style>
