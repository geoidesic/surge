<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import { TJSSelect } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import { targets } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          ol.properties-list
            li Price: {$doc.system.price} {$doc.system.priceUnits}
            li Weight: {$doc.system.weight}
            li.mr-xs Equipped: 
              +if("$doc.system.equipped")
                i.fas.fa-check
                +else
                  i.fas.fa-times

            +if("parentIsActor")
              li Quantity: {$doc.system.quantity}
              li Location: {$doc.system.location}
            
          
        .flexcol.flex3.left
          h1.flex0 Description
          ProseMirror( attr="system.description" )

</template>

<style lang="scss" scoped>
  .flexrow {
    gap: 2px;
  }
  .flexcol {
    gap: 2px;
  }
  label {
    margin: 0;
    padding: 0;
  }
  .box {
    background: silver;
    border: 1px;
  }
  .properties-list {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin: 3px 0;
      padding: 0 2px;
      background: rgba(0, 0, 0, 0.05);
      border: 2px groove #eeede0;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
    }
  }
</style>
