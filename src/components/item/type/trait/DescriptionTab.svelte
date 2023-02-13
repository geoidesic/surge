<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  console.log("Trait Descriptions");
  console.log($doc);
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          
          label Cost
          DocInput(attr="system.xpOffset" inputType="number")
          label Code
          DocInput(attr="system.code")
          label XP
          DocInput(attr="system.xpAssigned")
          label Level
          DocInput(attr="system.level")
          
          
        .flexcol.flex3.left
          h1.flex0 Description
          ProseMirror( attr="system.description" )

</template>

<style lang="scss" scoped>
  .flexrow {
    gap: 2px;
  }
  .flexcol {
    gap: 2px;
  }
  label {
    margin: 0;
    padding: 0;
  }
</style>
