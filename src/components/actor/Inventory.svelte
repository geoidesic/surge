<script>
  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import { createFilterQuery } from "@typhonjs-fvtt/svelte-standard/store";
  import { rippleFocus } from "@typhonjs-fvtt/svelte-standard/action";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import TextInput from "~/helpers/svelte-components/input/TextInput.svelte";
  import ItemInput from "~/components/item/ItemInput.svelte";
  import Encumbrance from "~/components/actor/Encumbrance.svelte";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";

  const doc = getContext("#doc");
  console.log($doc);

  const filterSearch = createFilterQuery("name");

  const input = {
    store: filterSearch,
    efx: rippleFocus(),
    placeholder: "wildcard",
    type: "search",
  };

  /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
  const wildcard = doc.embedded.create("Item", {
    name: "wildcard",
    filters: [filterSearch],
    sort: (a, b) => a.name.localeCompare(b.name),
  });

  $: items = [...$wildcard];
  $: lockCSS = $doc.system.inventoryLocked ? "lock" : "lock-open";
  $: faLockCSS = $doc.system.inventoryLocked ? "fa-lock" : "fa-lock-open";

  $: inventoryWeight = $doc.items.reduce((sum, item) => {
    sum += parseFloat(item.system.weight) * parseInt(item.system.quantity);
    return sum;
  }, 0);

  $: ENC = (
    inventoryWeight /
    parseFloat($doc.system.STR) /
    ($doc.system.siz.currentValue * $doc.system.siz.currentValue)
  ).toFixed(1);

  $: encumbrance =
    ENC > 1 && ENC <= 2
      ? "light"
      : ENC > 2 && ENC <= 4
      ? "medium"
      : ENC > 4 && ENC <= 5
      ? "heavy"
      : ENC > 5
      ? "immobile"
      : "none";

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

  function rowWeight(item) {
    return parseFloat(item.system.quantity) * parseFloat(item.system.weight);
  }

  function validateQuantity(event, item, index) {
    console.log("validate item");
    console.log(event);
    console.log(event.target.value);
    console.log(typeof event.target.value);

    if (event.key == "Tab") {
      console.log("Tab");
      return true;
    }
    if (event.key.includes("Arrow")) {
      console.log("Arrow key");
      if (event.key.includes("Down")) {
        if (event.target.value > 0) return;
      } else {
        return;
      }
    }

    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(event.key))) {
      console.log("Number key");
      if (event.target.value == 0 && event.key != 0) {
        return true;
      } else {
        if (event.target.value > 0) return true;
        console.log("Negative value");
      }
    }

    if (event.key == "Backspace") {
      console.log("Backspace");
      if (event.target.value.charAt(0) != 0) {
        return true;
      } else {
        if (event.target.value.length > 1) return true;
      }
    }

    event.preventDefault();
    event.stopPropagation();
  }

  function updateItem(event, item, index) {
    //- via svelte
    item.update({ "system.quantity": event.target.value });
  }
</script>

<template lang="pug">
  ScrollingContainer
    .flexrow.pt-sm.pr-sm
      .flexcol.flex1(style="justify-content: center")
        label Search
      .flex3.left
        TJSInput {input} {$wildcard}
    

    div.pa-sm
      ol
        li.flexrow.header
          div.flex0
            div
              img.left.flex0
          .flex3.left.ml-xl
            div Name
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
              input(type="number" bind:value="{item.system.quantity}" on:keydown="{validateQuantity(event, item, index)}" on:keyup="{updateItem(event, item, index)}")
            .flex1
              div {rowWeight(item)}
            div.left.ml-sm {item.type}
            div.actions.flex1.right
              +if("!$doc.system.inventoryLocked")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-edit.mr-md( on:click="{editItem(index, item)}")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, item)}")
        li.flexrow.footer
          div.flex0
            div.mr-sm Enc.
          .flex3.left
            div.flexrow
              div.left.flex1 {ENC}
              div.flex3.enc.center
                Encumbrance(className="bg")
          .flex1
            div Weight
          .flex1
            div {inventoryWeight}
          div.flexrow.ml-sm 
            div AP 
            div.right {$doc.system.AP}
        
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

  input {
    background-color: white;
    height: 1.2rem;
  }
</style>
