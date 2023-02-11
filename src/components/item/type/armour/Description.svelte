<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  console.log($doc);
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          label Equipped
          DocumentCheckboxInput(bind:value='{$doc.system.equipped}')
          label Price
          DocInput(attr="system.price" inputType="number")
          label Weight
          DocInput(attr="system.weight" inputType="number")
          label Quantity
          DocInput(attr="system.quantity" inputType="number")
          label Location
          DocInput(attr="system.location")
          
          
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
