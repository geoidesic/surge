<svelte:options accessors={true} />

<script>
  import { getContext } from "svelte";
  import { rippleFocus } from "@typhonjs-fvtt/svelte-standard/action";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";
  import { createFilterQuery } from "~/filters/effectsFilterQuery";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import NumericInputValidator from "~/components/actor/NumericInputValidator";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import TextInput from "~/helpers/svelte-components/input/TextInput.svelte";
  import ItemInput from "~/components/item/ItemInput.svelte";
  import Encumbrance from "~/components/actor/Encumbrance.svelte";
  import XPcalc from "~/helpers/XPcalc.js";
  import Select from "~/helpers/svelte-components/select/Select.svelte";
  import RollCalc from "~/components/actor/RollCalc";

  const Actor = getContext("#doc");
  const doc = new TJSDocument($Actor);

  const nameSearch = createFilterQuery("name");
  const typeSearch = createFilterQuery("type");
  const fixedType = createFilterQuery("type");
  // typeSearch.set("effect");
  // typeSearch.set("trait"); //- @deprecated as Trait is now a collective term for other types

  //- @todo: is this necessary / correct?
  if (!$doc.system.currentItemTypeFilter) {
    $doc.system.currentItemTypeFilter = "all";
  }

  let typeFilterValue = $doc.system.currentItemTypeFilter;

  $: $doc.system.currentItemTypeFilter = typeFilterValue;
  $: typeSearch.set(typeFilterValue);

  const typeFilterOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "feat",
      label: "Feat",
    },
    {
      value: "flaw",
      label: "Flaw",
    },
    {
      value: "skill",
      label: "Skill",
    },
    {
      value: "spell",
      label: "Spell",
    },
    {
      value: "talent",
      label: "Talent",
    },
  ];

  const input = {
    store: nameSearch,
    efx: rippleFocus(),
    placeholder: "*",
    type: "search",
  };

  /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
  const wildcard = doc.embedded.create("ActiveEffect", {
    name: "wildcard",
    // filters: [fixedType, nameSearch, typeSearch],
    // filters: [fixedType],
    // sort: (a, b) => a.title.localeCompare(b.title),
  });

  $: ActiveEffects = [...$wildcard];
  $: lockCSS = $doc.system.inventoryLocked ? "lock" : "lock-open";
  $: faLockCSS = $doc.system.inventoryLocked ? "fa-lock" : "fa-lock-open";
  $: xpUnspent = parseInt($doc.system.xpUnspent) || 0;

  Hooks.on("createItem", async (item) => {
    console.log(item);
  });

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
    //- first re-assign XP from this trait back to the unspent pool
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
    item.sheet.render(true);
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
  let keyUp = true;
  let prevValue;
  const xpValidator = new NumericInputValidator();
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
            div Name
          .flex1
            div Type
          .flex1
            div Status
          .flex1
            div Mod
          .flex1
            div Source
          div.actions.flex1.right 
            div.rowbutton.rowimgbezelbutton(class="{lockCSS}")
              i.fa(class="{faLockCSS}" on:click="{toggleLock}")
        +each("ActiveEffects as effect, index")
          li.flexrow.relative.itemrow
            .flex3.left.ml-xl
              div {effect.label}

            div.actions.flex1.right
              +if("!$doc.system.inventoryLocked")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-edit.mr-md( on:click="{editItem(index, effect)}")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, effect)}")
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
