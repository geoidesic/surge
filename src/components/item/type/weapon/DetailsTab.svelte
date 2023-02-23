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
          .flexrow.left.mt-xs
            //- @todo: not sure we need these? Maybe they can be effects. That way DR is not limited by damage type. 
            //- Alternately the MultiSelect component does have an +add button option and we could use it to add rows.
            //- Thus a row for each damage type, plus it's value. But again I think ActiveEffects already is a better system for this
            //- label DR - Slice
            //- DocumentTextInput(type='number' step='any' name='system.weight'  placeholder='—' bind:value="{$doc.system.weight}")
            //- label DR - Cudgel
            //- DocumentTextInput(type='number' step='any' name='system.weight'  placeholder='—' bind:value="{$doc.system.weight}")
            //- label DR - Impale
            //- DocumentTextInput(type='number' step='any' name='system.weight'  placeholder='—' bind:value="{$doc.system.weight}")

        CommonPrerequisites

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
