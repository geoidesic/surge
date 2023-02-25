<svelte:options accessors={true} />

<script>
  import { getContext } from "svelte";
  import { rippleFocus } from "@typhonjs-fvtt/svelte-standard/action";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";
  import { createFilterQuery } from "~/filters/inventoryFilterQuery";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import { validateNumericInput } from "~/helpers/Utility.js";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import TextInput from "~/helpers/svelte-components/input/TextInput.svelte";
  import ItemInput from "~/components/item/ItemInput.svelte";
  import InventoryRow from "~/components/actor/InventoryRow.svelte";
  import Encumbrance from "~/components/actor/Encumbrance.svelte";
  import Select from "~/helpers/svelte-components/select/Select.svelte";
  import RollCalc from "./RollCalc";

  const Actor = getContext("#doc");
  const doc = new TJSDocument($Actor);

  const nameSearch = createFilterQuery("name");
  const typeSearch = createFilterQuery("type");

  const typeFilterOptions = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "ammunition",
      label: "Ammunition",
    },
    {
      value: "armour",
      label: "Armour",
    },
    {
      value: "clothing",
      label: "Clothing",
    },
    {
      value: "container",
      label: "Container",
    },
    {
      value: "shield",
      label: "Shield",
    },
    {
      value: "weapon",
      label: "Weapon",
    },
  ];

  const input = {
    store: nameSearch,
    efx: rippleFocus(),
    placeholder: "by Name",
    type: "search",
  };

  /** @type {import('@typhonjs-fvtt/runtime/svelte/store').DynMapReducer<string, Item>} */
  const wildcard = doc.embedded.create("Item", {
    name: "wildcard",
    filters: [nameSearch, typeSearch],
    sort: (a, b) => a.name.localeCompare(b.name),
  });

  function deleteItem(index, item) {
    item.delete();
  }

  function editItem(index, item) {
    item.sheet.render(true);
  }
  function toggleLock(event) {
    console.log("toggleLock Effects");
    event.stopPropagation();
    event.preventDefault();
    // $doc.system.inventoryLocked = !$doc.system.inventoryLocked;
    $doc.update(
      {
        ["system.inventoryLocked"]: !$doc.system.inventoryLocked,
      },
      {
        diff: true,
        diffData: true,
        diffSystem: true,
      }
    );
  }
  function toggleEquipped(item) {
    item.update({ ["system.equipped"]: !item.system.equipped });
    console.log(item);
  }

  function rowWeight(item) {
    const val = parseFloat(item.system.quantity) * parseFloat(item.system.weight);
    return isNaN(val) ? 0 : val;
  }

  function updateQuantity(event, item, index) {
    item.update({ "system.quantity": event.target.value });
  }

  let typeFilterValue = $doc.system.currentItemTypeFilter;

  $: $doc.system.currentItemTypeFilter = typeFilterValue;
  $: typeSearch.set(typeFilterValue);
  $: items = [...$wildcard];
  $: lockCSS = $doc.system.inventoryLocked ? "lock" : "lock-open";
  $: faLockCSS = $doc.system.inventoryLocked ? "fa-lock" : "fa-lock-open";
</script>

<template lang="pug">
  ScrollingContainer
    .flexrow.pt-sm.pr-sm
      .flexcol.flex1.label-container 
        label Search
      .flex3.left
        TJSInput({input}) {$wildcard}
      .flexcol.flex1.label-container 
        label Type
      .flex3.right
        Select(options="{typeFilterOptions}" bind:value="{typeFilterValue}")
    

    div.pa-sm
      ol
        InventoryRow.header
          div(slot="c1") 
          div(slot="c2") 
            div Name
          div(slot="c3") Type
          div(slot="c4")
            div Quantity
          div(slot="c5") 
            i.fas.fa-weight-hanging
          div(slot="c6") 
            i.fas.fa-person-walking-luggage
          div(slot="c7") 
            div.rowbutton.rowimgbezelbutton(class="{lockCSS}")
              i.fa(class="{faLockCSS}" on:click="{toggleLock}")
        +each("items as item, index")
          InventoryRow.relative
            div(slot="c1" on:click="{clickItem(index, item)}")
              div.flex0
                div.relative
                  div.rowimgbutton.rowimgbezelbutton(on:click!="{new RollCalc({doc: item, Actor: $doc, code: 'size', rollType: 'inventory'})}")
                    img.left.flex0(src="{item.img}" )
            div(slot="c2") 
              div {item.name}
            div(slot="c3") {item.type}
            div(slot="c4") 
              input(type="number" bind:value="{item.system.quantity}" on:keydown="{validateNumericInput(event, item, index)}" on:keyup="{updateQuantity}")
            div(slot="c5")              
              div {rowWeight(item)}
            div(slot="c6") 
              input(type='checkbox' checked="{!item.equipped}" on:change="{toggleEquipped(item)}")
            div(slot="c7")
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
              div.left.flex1 
                Encumbrance(className="value")
              div.flex3.enc.center
                Encumbrance(className="bg")
          .flex1
            div Weight
          .flex1
            Encumbrance(className="total") 
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

  i {
    padding: 0;
    margin: 0;
  }

  .rowimgbutton {
    position: absolute;
    top: calc(50% - 15.5px);
    left: -2px;
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
    li,
    :global(li) {
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

  .label-container {
    justify-content: center;
  }
</style>
