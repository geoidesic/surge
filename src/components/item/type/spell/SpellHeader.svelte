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
    .stat.pa-xs {$doc.system.level}
  .stat.pa-xs {$doc.system.manaType}
  .stat.pa-xs {$doc.system.school}
  .stat.pa-xs {$doc.system.rarity}

section.extra-info.flexrow
  +if("parentIsActor")
    label Level (AF)
  label Mana Type
  label Magic School
  label Rarity
</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .extra-info {
    @include sheetHeader;
  }
</style>
