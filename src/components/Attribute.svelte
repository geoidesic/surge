<script>
  import { getContext } from "svelte";
  import DocInput from "~/components/DocInput.svelte";
  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";

  export let xp = 0;
  export let code = "";
  export let name = "";
  export let baseValue = "";
  export let currentValue = "";

  const doc = getContext("#doc");
  const updateCurrentDebounce = debounce(updateCurrent, 500);
  const updateXPDebounce = debounce(updateXP, 500);
  const updateBaseDebounce = debounce(updateBase, 500);

  console.log("code", code);
  console.log(doc);
  console.log($doc.system?.[code]);

  function updateCurrent(event) {
    if ($doc) {
      $doc.update({ [`system.${code}.currentValue`]: event.target.value });
    }
  }
  function updateBase(event) {
    if ($doc) {
      $doc.update({ [`system.${code}.baseValue`]: event.target.value });
    }
  }
  function updateXP(event) {
    if ($doc) {
      $doc.update({ [`system.${code}.xp`]: event.target.value });
    }
  }

  //- sample data:
  //- "siz":{"name":"size","xp":0,"traitDescription":"","baseValue":0,"currentValue":0},
</script>

<template lang="pug">
  .flexrow.attribute(style="max-height: 1.4rem" class="{$doc.system[code].group} {code}" )
    h2 {code}
    input.base(type="number" value="{$doc.system[code].baseValue}" on:input="{updateBaseDebounce}" disabled)
    input.current(type="number" value="{$doc.system[code].currentValue}" on:input="{updateCurrentDebounce}")
    input.xp(type="number" value="{$doc.system[code].xp}" on:input="{updateXPDebounce}")
</template>

<style lang="scss" scoped>
  .attribute {
    padding: 0px 8px;
  }
  h2 {
    border: none;
    text-align: right;
    margin-right: 0.3rem;
    font-size: 1rem;
  }
  input {
    padding: 0;
    margin: 0;
    height: var(--attribute-field-height);
  }
</style>
