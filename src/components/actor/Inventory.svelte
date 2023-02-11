<script>
  import { getContext } from "svelte";
  import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocInput from "~/components/actor/ActorInput.svelte";

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
</script>

<template lang="pug">
  ScrollingContainer

    ol
      li.flexrow.mb-sm.bold
        div.flex0.rowbutton.hide
          //- i.left.fa.fa-dice.mr-md
          img.left.flex0.hide()
        //- //- div.left Sort
        div.left.flex2 Name
        div.left.ml-sm Type
        img.left.flex0.hide()
        div.left
        div.actions.flex0.hide
          div.rowbutton
            i.left.fa.fa-dice.mr-md
        //- div Ownership
        //- div Flags
      +each("items as item, index")
        li.flexrow
          div.flex0
            div.rowimgbutton.rowimgbezelbutton( on:click="{clickItem(index, item)}")
              img.left.flex0(src="{item.img}" )
            //- i.left.fa.fa-dice.mr-md
          //- div {item.sort}
          DocInput(attr=`items.{index}.name`)
          DocInput(attr=`items.{index}.quantity` inputType="number")
          div.left.ml-sm {item.type}
          //- img.left.flex0(src="{item.img}" )
          //- div {Object.keys(item.ownership)}
          //- div {Object.keys(item.flags)}
          div.actions.flex1.right
            div.rowbutton.rowimgbezelbutton
              i.left.fa.fa-edit.mr-md( on:click="{editItem(index, item)}")
            div.rowbutton.rowimgbezelbutton
              i.left.fa.fa-trash.mr-md( on:click="{deleteItem(index, item)}")
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
    width: 20px;
    height: 20px;
    padding: 0 1px 20px 0;
    object-fit: cover;
    border: 1px solid grey;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
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
    padding: 0.4rem;
    li {
      padding: 3px;
      margin: 2px;
      border: 1px solid grey;
      border-radius: 2px;
      align-items: center;
      div {
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
