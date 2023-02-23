<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
.tab
  .envelope
    h2.mt-none Detail
    .flexrow.left.mt-xs.mb-xs
      label.flex1 Rarity
      DocumentRaritySelect(bind:value='{$doc.system.rarity}')
    .flexrow
      .labels.flexcol.left
        div
          label XP Cost (for level 0)
        div
          label Code
        +if("parentIsActor")
          label XP
        +if("parentIsActor")
          label Level
        div 
          label AP cost
        

      .values.flexcol.left.form-group-stacked
          div
            DocInput(attr="system.xpOffset" inputType="number")
          div
            DocInput(attr="system.code")
          +if("parentIsActor")
            div
              DocInput(attr="system.xpAssigned")
          +if("parentIsActor")
            div
              //- DocInput(attr="system.level")
              DocumentTextInput(type="number" step="any" name="system.level" placeholder="Point Blank" data-tooltip="SURGE.TraitLevel" aria-describedby="tooltip" bind:value="{$doc.system.level}")

          div
            DocInput(attr="system.APcost")
</template>

<style lang="scss" scoped>
  @import "../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
