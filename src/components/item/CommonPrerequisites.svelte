<script>
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import DocumentSelect from "~/components/elements/DocumentSelect.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import PrerequisiteSelect from "~/components/elements/PrerequisiteSelect.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
.tab
  .envelope
    h2.mt-none Prerequisites
    .flexrow.left.mt-xs
      label.flex1 Prerequisites?
      DocumentCheckboxInput(class="cheeky" bind:value='{$doc.system.reqs.value}')
    .flexrow.left.mt-xs
      +if("$doc.system.reqs.value")
        label.flex1 Prerequisite Type
        DocumentSelect(name='system.reqs.type' data-tooltip='SURGE.PrerequisitesType' aria-describedby='tooltip' bind:value="{$doc.system.reqs.type}")
          option(value selected)
          option(value='all') All
          option(value='any') Any
          option(value='some') At least
    .flexrow.left.mt-xs
      +if("$doc.system.reqs.value && $doc.system.reqs.type === 'some'")
        label.flex1 Prerequisites Minimum
        DocumentTextInput(type="number" step="any" name="system.reqs.min" placeholder="Point Blank" data-tooltip="SURGE.MinimumPrerequisites" aria-describedby="tooltip" bind:value="{$doc.system.reqs.min}")
    .flexrow.left.mt-xs
      +if("$doc.system.reqs.value")
        .flexcol
          label.flex1 Prerequisites List
          PrerequisiteSelect.flex3
</template>

<style lang="scss" scoped>
  @import "../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
