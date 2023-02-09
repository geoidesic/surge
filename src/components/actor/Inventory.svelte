<script>
  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";

  const doc = getContext("#doc");
  $: items = [...$doc.items]; //- make the items iterable; //- @todo: does this re-render any time the document is updated?
  console.log(typeof $doc.items);
  console.log(typeof items);
  console.log($doc.items);
  console.log(doc.embedded);
  console.log(items);
  console.log(Object.getPrototypeOf($doc.items));
  let prototype = Object.getPrototypeOf($doc);
  console.log(prototype);

  console.log(Object.prototype.toString.call($doc));

  if (prototype.hasOwnProperty("update")) {
    console.log("update is defined on the prototype of the object");
  }

  const itemStore = new TJSDocument(void 0, {});
  // itemStore.set($doc.items);

  console.log(itemStore);

  /**
   * @todo: hooks that are called when an item is dropped on the sheet
   * dropActorSheetData
   * preCreateItem
   * createItem
   */
  Hooks.on("createItem", async (item) => {
    console.log(item);
  });
</script>

<template lang="pug">
  ol
    li.flexrow.mb-sm.bold
      div 
      div.left Sort
      div.left Name
      div.left Type
      //- div Ownership
      //- div Flags
    +each("items as item")
      li.flexrow
        img.flex0(src="{item.img}" width="20px" height="20px")
        div {item.sort}
        div.left {item.name}
        div.left {item.type}
        //- div {Object.keys(item.ownership)}
        //- div {Object.keys(item.flags)}
</template>

<style lang="scss" scoped>
  img {
    border: none;
  }
</style>
