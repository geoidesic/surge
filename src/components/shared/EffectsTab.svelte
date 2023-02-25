<svelte:options accessors={true} />

<script>
  import { getContext, setContext } from "svelte";
  import { rippleFocus } from "@typhonjs-fvtt/svelte-standard/action";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";
  import { createFilterQuery } from "~/filters/effectsFilterQuery";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import { activeEffectModes, effectTriggers } from "~/helpers/Constants.js";
  import { getEffectOrigin } from "~/helpers/Utility.js";
  import NumericInputValidator from "~/components/actor/NumericInputValidator";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import TextInput from "~/helpers/svelte-components/input/TextInput.svelte";
  import ItemInput from "~/components/item/ItemInput.svelte";
  import Encumbrance from "~/components/actor/Encumbrance.svelte";
  import XPcalc from "~/helpers/XPcalc.js";
  import Select from "~/helpers/svelte-components/select/Select.svelte";
  import RollCalc from "~/components/actor/RollCalc";

  const documentStore = getContext("#doc");
  const doc = new TJSDocument($documentStore);

  const nameSearch = createFilterQuery("label");
  const typeSearch = createFilterQuery("type");
  const fixedType = createFilterQuery("type");

  console.log(getEffectOrigin, doc);
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
    filters: [nameSearch, typeSearch],
    // filters: [typeSearch],
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
    $doc.update({
      ["system.inventoryLocked"]: !$doc.system.inventoryLocked,
    });
  }

  function toggleEffect(effect) {
    console.log(effect);
    effect.update({ disabled: !effect.disabled });
  }

  let key = false;
  let keyUp = true;
  let prevValue;
  const xpValidator = new NumericInputValidator();

  console.log($doc);

  async function openActiveEffectEditor() {
    const effect = await ActiveEffect.create(
      {
        label: $doc.name,
        icon: $doc.img,
        origin: $doc.id,
        disabled: false,
        transfer: true,
        flags: {
          source: "user",
        },
      },
      { parent: $doc }
    );

    const effectConfig = new ActiveEffectConfig(effect, { editable: true });
    effectConfig.render(true);
  }
</script>

<template lang="pug">
  ScrollingContainer

    .flexrow.pt-sm.pr-sm
      .flexcol.flex1.label-container 
        label Search
      .flex3.left
        TJSInput({input}) {$wildcard}
      .flexcol.flex1.label-container 
        label Source
      .flex3.right
        Select(options="{typeFilterOptions}" bind:value="{typeFilterValue}")

    div.pa-sm
      ol
        li.flexrow.header
          .flex0
          .flex3.left.ml-xl
            div Name
          .flex1
            div Mode
          .flex1
            div Mod
          +if("$doc.type != 'effect'")
            .flex1
              div From
          +if("$doc.type != 'effect'")
            .flex1
              div On
          .flex2.left
            div Trigger
          div.actions.flex1.right
            div.rowbutton.rowimgbezelbutton(class="{lockCSS}")
              i.fa(class="{faLockCSS}" on:click="{toggleLock}")
        +each("ActiveEffects as effect, index")
          li.flexrow.relative.itemrow
            .flex0
              div.flex0
                div.rowimgbutton
                  img.left.flex0(src="{effect.icon}" )
            .flex3.left.ml-xl
              div {effect.label}
            .flex1
              +if("effect.changes?.[0]")
                div {activeEffectModes.find(a => a.value == effect.changes[0].mode).label}
            .flex1
              +if("effect.changes?.[0]")
                div {effect.changes[0].value}
            +if("$doc.type != 'effect'")
              .flex1.relative
                img.origin.flex0(src="{getEffectOrigin(effect).img}" data-tooltip="{getEffectOrigin(effect).name}" aria-describedby="tooltip")
            +if("$doc.type != 'effect'")
              .flex1
                input(type='checkbox' checked="{!effect.disabled}" data-tooltip="SURGE.ToggleEnabled" aria-describedby="tooltip" on:change="{toggleEffect(effect)}")
            .flex2
              Select(options="{effectTriggers}" bind:value="{effect.flags.trigger}")
              
            div.actions.flex1.right
              +if("!$doc.system.inventoryLocked")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-edit.mr-md( on:click="{editItem(index, effect)}")
                div.rowbutton.rowimgbezelbutton
                  i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, effect)}")
        li.flexrow.footer

    .pa-sm
      p 
        strong Note 
        | that each of the listed effects may make multiple changes. Only the values for first such change will be shown in each row here. Edit the effect to see all the details.

      button(on:click="{openActiveEffectEditor}") + Add Effect

</template>

<style lang="scss" scoped>
  img {
    border: none;
    width: 20px;
    height: 20px;
    flex: auto;
    .origin {
      position: absolute;
      top: 0;
      height: 25px;
      margin-top: -12px;
      left: 35%;
      flex: auto;
    }
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
