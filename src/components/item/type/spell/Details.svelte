<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { TJSSelect } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import { AOEshapes, timeUnits, effectType } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer  
    .px-xs
      .flexcol
        .block
          h2.mt-none Effects
          .flexrow
            .labels.flexcol.left
              div
                label AF (Action Factor)
              div
                label Effect Type
              div
                label Effect Status
            .values.flexcol.left
              div
                input
              div
                TJSSelect(options="{effectType}" bind:value="{$doc.system.durationUnits}")
              div
                select
      .flexcol
        .block
          h2.mt-none Duration
          .flexrow
            .labels.flexcol.left
              div
                label Duration Units
              div
                label Duration
              div
                label Mods
            .values.flexcol.left
              div
                TJSSelect(options="{timeUnits}" bind:value="{$doc.system.durationUnits}")
              div
                DocInput(attr="system.duration")
              div
                select
      .flexcol
        .block
          h2.mt-none Area
          .flexrow
          
            .labels.flexcol.left
              div
                label Area of Effect?
              +if("$doc.system.hasAOE")
                div
                  label AOE shape
              +if("$doc.system.hasAOE")
                div
                  label AOE scale
            .values.flexcol.left
              dib
                DocumentCheckboxInput.cheeky(bind:value="{$doc.system.hasAOE}")
              +if("$doc.system.hasAOE")
                div
                  TJSSelect(options="{AOEshapes}" bind:value="{$doc.system.AOEshape}")
              +if("$doc.system.hasAOE")
                div
                  input
      .flexcol
        .block
          h2.mt-none Prerequisites
          .flexrow
            .labels.flexcol.left
              div
                label Prerequisites?
              +if("$doc.system.hasReqs")
                div
                  label Prerequisite Traits
              +if("$doc.system.hasReqs")
                div
                  label Prerequisite Type
            .values.flexcol.left
              div
                DocumentCheckboxInput(class="cheeky" bind:value='{$doc.system.hasReqs}')
              +if("$doc.system.hasReqs")
                div
                  select
              +if("$doc.system.hasReqs")
                div
                  select
        
        
        
        




</template>

<style lang="scss" scoped>
  .block {
    border: 10px solid #ff9900;
    border-radius: var(--border-radius);
    padding: 0 0.5rem 1rem 0.5rem;
    margin: 0.3rem 0;
    .label {
      vertical-align: -webkit-baseline-middle;
    }
  }

  //- example of child selector
  .block :global(.cheeky) {
    margin: 0 0 0 -2px;
  }
</style>
