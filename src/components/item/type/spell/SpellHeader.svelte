<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { TJSSelect } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import { manaTypes } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
section.extra-info.flexrow
  +if("parentIsActor")
    .stat.pa-xs {$doc.system.level}
  .stat.pa-xs {$doc.system.manaType}
  .stat.pa-xs {$doc.system.school}
  .stat.pa-xs {$doc.system.rarity}

section.extra-info.flexrow
  +if("parentIsActor")
    label Level
  label Mana Type
  label Magic School
  label Rarity
</template>

<style lang="scss" scoped>
  .extra-info {
    gap: 2px;
  }
  .stat {
    border-bottom: 1px solid rgb(94, 19, 19);
    // background-color: silver;
    // margin: 2px;
    margin-bottom: 2px;
    padding: 0;
  }
  label {
    font-family: "Modesto Condensed", "Palatino Lynotype", serif;
    font-size: 1.2rem;
    // border-top: 1px solid darkolivegreen;
  }
</style>
