<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          +if("parentIsActor")
            label Equipped
            DocumentCheckboxInput(bind:value='{$doc.system.equipped}')
          div
            label Price
            DocInput(attr="system.price" inputType="number")
          div
            label Weight
            DocInput(attr="system.weight" inputType="number")
          +if("parentIsActor")
            label Quantity
            DocInput(attr="system.quantity" inputType="number")
          +if("parentIsActor")
            label Location
            DocInput(attr="system.location")
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
