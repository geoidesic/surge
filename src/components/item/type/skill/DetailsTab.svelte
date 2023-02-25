<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
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
          h2.mt-none Specifications
          
          .flexrow.left.mt-xs
            

        CommonPrerequisites

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
