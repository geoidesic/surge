<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import { TJSSelect } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import { targets } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          
          div
            label XP Cost (for level 0)
            DocInput(attr="system.xpOffset" inputType="number")
          div
            label Code
            DocInput(attr="system.code")
          +if("parentIsActor")
            label XP
            DocInput(attr="system.xpAssigned")
          +if("parentIsActor")
            label Level
            DocInput(attr="system.level")
          div 
            label AP cost
            DocInput(attr="system.APcost")
          div 
            label Range
            DocInput(attr="system.range")

          div 
            label Target
              TJSSelect(options="{targets}" bind:value="{$doc.system.target}")


          
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
