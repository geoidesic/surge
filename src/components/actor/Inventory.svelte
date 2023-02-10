<script>
  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocInput from "~/components/DocInput.svelte";

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

  function deleteItem(index, item) {
    console.log(index);
    console.log(item);
    item.delete();
  }
</script>

<template lang="pug">
  ScrollingContainer.container

    ol
      li.flexrow.mb-sm.bold
        div.flex0.rowbutton.hide
          i.left.fa.fa-dice.mr-md
        //- div 
        //- div 
        //- //- div.left Sort
        div.left Name

        div.left.ml-sm Type
        img.left.flex0.hide(width="20px" height="20px")
        div.left
        div.actions.flex0.hide
          div.rowbutton
            i.left.fa.fa-dice.mr-md
        //- div Ownership
        //- div Flags
      +each("items as item, index")
        li.flexrow
          div.flex0.rowbutton
            i.left.fa.fa-dice.mr-md
          //- div {item.sort}
          DocInput(attr=`items.{index}.name`)
          div.left.ml-sm {item.type}
          img.left.flex0(src="{item.img}" width="20px" height="20px")
          //- div {Object.keys(item.ownership)}
          //- div {Object.keys(item.flags)}
          div.actions.flex0
            div.rowbutton
              i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, item)}")
</template>

<style lang="scss" scoped>
  img {
    border: none;
  }
  .actions {
    margin-left: 0.5rem;
    margin-right: 0;
    justify-content: right;
  }
  .rowbutton {
    padding: 5px;
    margin-right: 0.5rem;
    border: 1px solid grey;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    i {
      padding: 0;
      margin: 0;
    }
  }
  ol {
    height: 100%;
    margin: 0;
    padding: 0.4rem;
    li {
      margin: 2px;
      border: 1px solid grey;
      border-radius: 2px;
      padding: 5px;
      align-items: center;
      div {
      }
    }
  }
</style>
