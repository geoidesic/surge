<svelte:options accessors={true} />

<script>
  import { getContext } from "svelte";
  import { rippleFocus } from "@typhonjs-fvtt/svelte-standard/action";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";
  import { createFilterQuery } from "@typhonjs-fvtt/svelte-standard/store";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import NumericInputValidator from "./NumericInputValidator";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import TextInput from "~/helpers/svelte-components/input/TextInput.svelte";
  import ItemInput from "~/components/item/ItemInput.svelte";
  import Encumbrance from "~/components/actor/Encumbrance.svelte";
  import XPcalc from "~/components/actor/XPcalc.js";

  // const doc = getContext("#doc");

  const Actor = getContext("#doc");
  const doc = new TJSDocument($Actor);

  const nameSearch = createFilterQuery("name");
  const typeSearch = createFilterQuery("type");
  typeSearch.set("trait");

  const input = {
    store: nameSearch,
    efx: rippleFocus(),
    placeholder: "*",
    type: "search",
  };

  /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
  const wildcard = doc.embedded.create("Item", {
    name: "wildcard",
    filters: [nameSearch, typeSearch],
    sort: (a, b) => a.name.localeCompare(b.name),
  });

  $: items = [...$wildcard];
  $: lockCSS = $doc.system.inventoryLocked ? "lock" : "lock-open";
  $: faLockCSS = $doc.system.inventoryLocked ? "fa-lock" : "fa-lock-open";
  $: xpUnspent = parseInt($doc.system.xpUnspent) || 0;

  /**
   * Handles parsing the drop event and sets new document source.
   *
   * @param {DragEvent}   event -
   */
  function onDrop(event) {
    try {
      doc.setFromDataTransfer(JSON.parse(event.dataTransfer.getData("text/plain")));
    } catch (err) {
      /**/
    }
  }

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

  let key = false;
  let keyUp = false;
  let prevValue;
  const xpValidator = new NumericInputValidator();
  const XP = new XPcalc($doc);

  function validateXpAssigned(event, item) {
    if (keyUp === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    key = xpValidator.validate(event, xpUnspent);
    prevValue = parseInt(event.target.value);

    if (key == false) return;

    const value = parseInt(event.target.value);
    if (key == "up" && xpUnspent <= 0) {
      console.log("validate failed because no unspentXP");
      event.preventDefault();
      event.stopPropagation();
    }
    keyUp = false;
  }

  function updateXpAssigned(event, item) {
    keyUp = true;
    //- if the value has been deleted completely, then set it to zero
    if (event.target.value === "") {
      event.target.value = 0;
      $doc.update({ [`system.xpUnspent`]: unspentXp - prevValue });
    }

    //- if there was a keypress that failed validation return
    if (key === false) {
      console.log("keydown validation failed: do not update");
      return;
    }
    if (!typeof item.system.level == "number") {
      console.log("Invalid level");
      item.system.level = 0;
    }

    let value = parseInt(event.target.value);

    let dir = key == "up" || key == "down" ? key : XP.directionOfChange(value, item.system.xpAssigned);
    let diff = prevValue - value;
    if (diff < 0 && xpUnspent + diff < 0) {
      console.log("Update would result in negative unspent XP, revert value to min");
      diff = -xpUnspent;
      value = prevValue + xpUnspent;
    }
    $doc.update({ [`system.xpUnspent`]: xpUnspent + diff });
    item.update({ "system.xpAssigned": value });
    updateLevel(value, item);
  }

  function updateLevel(value, item) {
    //- if the total XP assigned including this value equals the next level cost, then increase the level to next level
    //- if it falls below, recuce the level

    const currentLevel = item.system.level;
    const nextLevelCost = XP.levelCost(currentLevel + 1, item.system.cost);
    const currentLevelCost = XP.levelCost(currentLevel, item.system.cost);

    if (value >= nextLevelCost) {
      item.update({ "system.level": currentLevel + 1 });
    }
    if (value < currentLevelCost) {
      item.update({ "system.level": currentLevel - 1 });
    }
  }
</script>

<template lang="pug">
  ScrollingContainer
    .flexrow.pt-sm.pr-sm
      .flexcol.flex1(style="justify-content: center")
        label Search
      .flex3.left
        TJSInput({input}) {$wildcard}
    

    div.pa-sm
      ol
        li.flexrow.header
          div.flex0
            div
              img.left.flex0
          .flex3.left.ml-xl
            div Name
          .flex1
            div Lvl.
          .flex1
            div XP
          div.actions.flex1.right 
            div.rowbutton.rowimgbezelbutton(class="{lockCSS}")
              i.fa(class="{faLockCSS}" on:click="{toggleLock}")
        +each("items as item, index")
          li.flexrow.relative.itemrow
            div.flex0( on:click="{clickItem(index, item)}")
              div.rowimgbutton.rowimgbezelbutton
                img.left.flex0(src="{item.img}" )
            .flex3.left.ml-xl
              div {item.name}
            .flex1
              div {item.system.level}
            .flex1
              input(type="number" bind:value="{item.system.xpAssigned}" on:keydown!="{(event) => validateXpAssigned(event, item)}" on:keyup!="{(event) => updateXpAssigned(event, item)}")

            div.actions.flex1.right
              +if("!$doc.system.inventoryLocked")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-edit.mr-md( on:click="{editItem(index, item)}")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, item)}")
        li.flexrow.footer
          

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

  .itemrow {
    height: 1.9rem;
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
