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

  const doc = document || getContext("#doc");

  const updateDebounce = debounce(update, 500);

  // console.log(doc); //TJSDocument
  // console.log($doc); //Actor

  let data;
  let LABEL = !!label;

  console.log(attr);

  $: items = [...$doc.items];

  $: if (attr.includes("system.")) {
    const split = attr.split(".");
    console.log(split);
    data = $doc?.system?.[split[1]] || placeholder;
  } else if (attr.includes("items.")) {
    console.log("item DocInput");
    const split = attr.split(".");
    console.log(split);
    console.log(split[1]);
    console.log(split[2]);
    console.log(items);
    console.log(items.length);
    data = items?.[split[1]][split[2]] || placeholder;
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
  div.flexrow
    +if('LABEL')
      label {label}
    input.flex3(class="{className}" value="{data}" on:input="{updateDebounce}" placeholder="{placeholder}" maxlength="{maxlength}")
</template>

<style lang="scss" scoped>
</style>
