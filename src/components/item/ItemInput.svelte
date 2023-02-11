<script>
  import { getContext } from "svelte";
  import { debounce } from "@typhonjs-fvtt/runtime/svelte/util";
  import _ from "lodash";

  export let attr = void 0;
  export let label = "";
  export let placeholder = "";
  export let maxlength = "40";
  export let className = "";
  export let document = false;
  export let disabled = false;
  export let inputType = "text";

  const doc = document || getContext("#doc");
  const item = getContext("item");
  console.log(item);
  // console.log(doc.embedded);
  // console.log(Object.getOwnPropertyNames(doc.embedded));

  const updateDebounce = debounce(update, 500);

  console.log(doc); //TJSDocument
  console.log($doc); //Item

  let data;
  let LABEL = !!label;
  let type = "standard";
  const split = attr.split(".");

  $: if (attr.includes("system.")) {
    data = $doc?.system?.[split[1]] || placeholder;
  } else {
    data = $doc?.[attr] || placeholder;
  }

  function update(event) {
    if ($doc && event.target.value) {
      $doc.update({ [attr]: event.target.value });
    }
  }
</script>

<template lang="pug">
  div.flexrow
    +if('LABEL')
      label {label}
    input.flex3(type="{inputType}" class="{className}" value="{data}" on:input="{updateDebounce}" placeholder="{placeholder}" maxlength="{maxlength}")
</template>

<style lang="scss" scoped>
</style>
