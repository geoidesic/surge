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

  console.log(doc); //TJSDocument
  console.log($doc); //Actor

  let data;
  let LABEL = !!label;

  $: if (attr.includes("system.")) {
    const split = attr.split(".");
    console.log(split);
    data = $doc ? $doc?.system[split[1]] : "";
  } else {
    data = $doc ? $doc?.[attr] : "";
  }

  console.log(data);
  console.log(attr);
  console.log(attr.includes("system."));
  console.log($doc.system);

  function update(event) {
    if ($doc) {
      $doc.update({ [attr]: event.target.value });
    }
  }
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
<textarea class="flex3" value={data} on:input={updateDebounce} {placeholder} {maxlength} />
