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

  $: components = [];
  $: if ($doc.system.components.vocal) components.push("V");
  $: if ($doc.system.components.somatic) components.push("S");
  $: if ($doc.system.components.material) components.push("M");
  $: if ($doc.system.components.rune) components.push("R");
  $: if ($doc.system.components.concentration) components.push("C");
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      .flexrow
        .flexcol.flex1.left
          h1.flex0 Properties
          ol.properties-list
            li {components.join(',')}
            +if("$doc.system.Mcomponents")
              li {$doc.system.Mcomponents}
            +if("$doc.system.actionType")
              li {$doc.system.actionType}
            +if("$doc.system.APcost")
              li {$doc.system.APcost} AP
            +if("$doc.system.manaType")
              li {$doc.system.manaType}
            +if("$doc.system.target.value")
              li {$doc.system.target.value} {$doc.system.target.units} {$doc.system.target.type}
            +if("$doc.system.range.units")
              li {$doc.system.range.PB} / {$doc.system.range.RF} / {$doc.system.range.ER} {$doc.system.range.units}
            +if("$doc.system.duration.units")
              li {$doc.system.duration.value} {$doc.system.duration.units}
            
          
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
