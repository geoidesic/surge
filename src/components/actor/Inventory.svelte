<script>
  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";

  const doc = getContext("#doc");
  const STR = 3;

  $: items = [...$doc.items]; //- make the items iterable; //- @todo: does this re-render any time the document is updated?
  $: lockCSS = $doc.system.inventoryLocked ? "lock" : "lock-open";
  $: faLockCSS = $doc.system.inventoryLocked ? "fa-lock" : "fa-lock-open";
  $: totalWeight = items.reduce((sum, item) => {
    console.log(sum);
    console.log(items);
    console.log(item);
    console.log(item.system);
    console.log(item.system.weight);
    sum += parseFloat(item.system.weight);
    return sum;
  }, 0);

  $: encumberance = (function (weight) {
    if (weight < 3 * 10) {
      return "light";
    }
    if (weight > 3 * 10) {
      return "heavy";
    }
  })(totalWeight);

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

  function clickItem(index, item) {
    console.log("clickItem");
    console.log(index);
    console.log(item);
  }
  function editItem(index, item) {
    console.log("editItem");
    console.log(index);
    console.log(item);
  }

  function toggleLock() {
    console.log("toggleLock");
    $doc.system.inventoryLocked = !$doc.system.inventoryLocked;
    $doc.update({
      system: $doc.system,
      flags: $doc.flags,
      name: $doc.name,
    });
  }
</script>

<template lang="pug">
  ScrollingContainer
    div.pa-sm
      ol
        li.flexrow.header
          div.flex0
            div
              img.left.flex0
          .flex3.left.ml-xl
            div
          .flex1
            div Quantity
          .flex1
            div lb.
          div.left.ml-sm Type
          div.actions.flex1.right 
            div.rowbutton.rowimgbezelbutton(class="{lockCSS}")
              i.fa(class="{faLockCSS}" on:click="{toggleLock}")
        +each("items as item, index")
          li.flexrow.relative
            div.flex0( on:click="{clickItem(index, item)}")
              div.rowimgbutton.rowimgbezelbutton
                img.left.flex0(src="{item.img}" )
            .flex3.left.ml-xl
              div {item.name}
            .flex1
              DocumentTextInput(bind:value="{item.system.quantity}")
            .flex1
              div {item.system.weight}
            div.left.ml-sm {item.type}
            div.actions.flex1.right
              +if("!$doc.system.inventoryLocked")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-edit.mr-md( on:click="{editItem(index, item)}")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, item)}")
        li.flexrow.footer
          div.flex0
            div
              img.left.flex0
          .flex3.left.ml-xl
            div.flexrow
              div.flex1 Enc.
              div.flex3.enc.center(class="{encumberance}") {encumberance}
          .flex1
            div Weight
          .flex1
            div {totalWeight}
          div.left.ml-sm 
        
          div.actions.flex1.right 
            div

</template>

<style lang="scss" scoped>
  img {
    border: none;
    width: 20px;
    height: 20px;
  }
  .actions {
    margin-left: 0.5rem;
    margin-right: 0;
    justify-content: right;
    :not(:last-child) {
      margin-right: 2px;
    }
  }
  .enc {
    border: 1px solid grey;
    border-radius: 3px;
    color: white;
    &.light {
      background-color: #19762d;
    }
    &.heavy {
      background-color: #9c0f0f;
    }
  }
  .rowimgbutton {
    position: absolute;
    top: -1px;
    left: 0;
    width: 30px;
    height: 30px;
    padding: 0;
    object-fit: cover;
    border: 1px solid grey;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .rowbutton {
    display: inline-block;
    padding: 3px 5px;
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
    padding: 0.1rem;
    border: 1px solid grey;
    li {
      padding: 3px;
      margin: 0 2px 2px 2px;
      align-items: center;
      &:not(.header):not(.footer) {
        background-color: #cdc8c7;
      }
      &.header {
        padding: 0 3px;
        line-height: 1rem;
        text-align: top;
        justify-content: top;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }

  .rowimgbezelbutton {
    border-style: solid;
    border-width: 1px;
    border-color: #bbb #aaa #999;
    text-shadow: 0 1px 0 #eee;
    background: #ccc;
    color: #333;
    font-family: "Lucida Grande";
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
    -webkit-border-radius: 3px;
    -webkit-box-shadow: inset 0 1px 1px #fff, inset 0 -1px 1px #aaa, 0 2px 4px -3px #666;
    &.lock-open {
      background-color: #19762d;
      color: white;
    }
    &.lock {
      background-color: #9c0f0f;
      color: white;
    }
  }
  .rowimgbezelbutton:active {
    -webkit-box-shadow: inset 0 1px 1px #aaa, inset 0 -1px 1px #aaa;
    border-color: #888 #aaa #eee;
  }
  // .rowimgbezelbutton.down {
  //   -webkit-box-shadow: inset 0 1px 1px #aaa, inset 0 8px 16px -4px #aaa, inset 0 -1px 1px #aaa;
  //   border-color: #888 #aaa #eee;
  // }
</style>
