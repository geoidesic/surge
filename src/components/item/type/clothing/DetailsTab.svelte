<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import DocumentSelect from "~/components/elements/DocumentSelect.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import PrerequisiteSelect from "~/components/elements/PrerequisiteSelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import CommonDetails from "~/components/item/CommonDetails.svelte";
  import CommonPrerequisites from "~/components/item/CommonPrerequisites.svelte";

  import { getContext } from "svelte";
  import { weightUnits, priceUnits } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">

  ScrollingContainer  
    .px-xs
      .flexcol.tab
        CommonDetails
        .envelope
          h2.mt-none Usage
          .flexrow.left.mt-xs
            label.flex1 Equipped
            DocumentCheckboxInput(name='system.equipped' bind:value="{$doc.system.equipped}") 
        .envelope
          h2.mt-none Specifications
          
          .flexrow.left.mt-xs
            label.flex1 Weight
            DocumentTextInput(type='number' step='any' name='system.weight'  placeholder='—' bind:value="{$doc.system.weight}")
            label.flex0 Units
            DocumentSelect( name='system.weightUnits'  placeholder='lb.' bind:value="{$doc.system.weightUnits}"  options="{weightUnits}")
          .flexrow.left.mt-xs
            label.flex1 Price
            DocumentTextInput(type='number' step='any' name='system.price'  placeholder='—' bind:value="{$doc.system.price}")
            label.flex0 Units
            DocumentSelect( name='system.priceUnits'  placeholder='lb.' bind:value="{$doc.system.priceUnits}"  options="{priceUnits}")
         
        CommonPrerequisites

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
