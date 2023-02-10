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
  // console.log($doc.items);
  // console.log(doc.embedded);
  // console.log(Object.getOwnPropertyNames(doc.embedded));

  const updateDebounce = debounce(update, 500);

  // console.log(doc); //TJSDocument
  // console.log($doc); //Actor

  let data;
  let LABEL = !!label;
  let type = "standard";

  // console.log(attr);
  const split = attr.split(".");

  $: items = [...$doc.items];

  $: if (attr.includes("system.")) {
    // console.log(split);
    data = $doc?.system?.[split[1]] || placeholder;
  } else if (attr.includes("items.")) {
    // console.log("item DocInput");
    // console.log(split);
    // console.log(split[1]);
    // console.log(split[2]);
    data = items?.[split[1]]?.[split[2]] || placeholder;
  } else {
    data = $doc?.[attr] || placeholder;
  }

  /**
   * @todo: DocInput for item name doesn't currently work:
   * `commons.js:5734 Uncaught (in promise) TypeError: (value || []).forEach is not a function`
   * This is because we're calling $doc.update on a kay of `items.0.name`, which is not how the update method is intended to be used.
   * Most likely we need to do something else in order to store items... like maybe store the whole items list via a different function
   * Something like:
   *  items[0] = event.target.value;
   *  $doc.update({ items });
   */
  function update(event) {
    if ($doc) {
      if (attr.includes("items.")) {
        // console.log("calling updateItems");
        updateItem(event);
      } else {
        // console.log(attr);
        // console.log(event.target.value);
        $doc.update({ [attr]: event.target.value });
      }
    }
  }

  function updateItem(event) {
    // console.log(attr);
    // console.log(split);
    // console.log(event.target.value);

    const item = items[split[1]];
    item.update({ name: event.target.value });
  }
</script>

<template lang="pug">
  div.flexrow
    +if('LABEL')
      label {label}
    input.flex3(class="{className}" value="{data}" on:input="{updateDebounce}" placeholder="{placeholder}" maxlength="{maxlength}")
</template>

<style lang="scss" scoped>
</style>
