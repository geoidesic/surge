<script>
  import { getContext } from "svelte";
  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";
  import _ from "lodash";

  export let attr = void 0;
  export let label = "";
  export let placeholder = "";
  export let maxlength = "40";

  const doc = getContext("#doc");

  const updateDebounce = debounce(update, 500);

  // console.log(doc); //TJSDocument
  // console.log($doc); //Actor

  let data;
  let LABEL = !!label;

  $: if (attr.includes("system.")) {
    const split = attr.split(".");
    console.log(split);
    data = $doc?.system?.[split[1]] || placeholder;
  } else {
    data = $doc?.[attr] || placeholder;
  }

  function update(event) {
    if ($doc) {
      $doc.update({ [attr]: event.target.value });
    }
  }

  // console.log("data", data);
  // console.log("data placeholder", placeholder);
  // console.log(attr);
  // console.log(attr.includes("system."));
  // console.log($doc.system);
</script>

<template lang="pug">
  //- for some reason pug chokes on the if syntax below here; odd because it's fine in PeakVTT
  //- {#if LABEL}
  //-   label {label}
  //- {/if}
  //- input.flex3(value="{data}" on:input="{updateDebounce}" placeholder="{placeholder}" maxlength="{maxlength}")
</template>

{#if LABEL}
  <label>{label}</label>
{/if}
<input class="flex3" value={data} on:input={updateDebounce} {placeholder} {maxlength} />

<style lang="scss" scoped>
  input {
    display: block;
    padding: 0;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 2rem;
    font-weight: 700;
    font-family: "Modesto Condensed", "Palatino Lynotype", serif;
    max-height: 2rem;
    background: none;
    -webkit-transition: background 0.3s ease, border-color 0.3s ease;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
</style>
