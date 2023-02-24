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

  async function openActiveEffectEditor() {
    //- only allow a single effect per item
    //- create an active effect
    const effect = await ActiveEffect.create(
      {
        label: $doc.name,
        icon: $doc.img,
        origin: $doc.id,
        disabled: false,
        transfer: true,
        duration: { rounds: 1 },
        flags: {},
        changes: [
          {
            key: "system.siz.mod",
            value: 2,
            mode: 2,
            priority: 20,
          },
        ],
      },
      { parent: $doc }
    );

    effect.sheet.render(true);
  }
</script>

<template lang="pug">

  ScrollingContainer
      
    .px-xs
      .flexcol.tab
        p.left 
          strong Note: 
          | you should set your item's profile image before adding an effect as the effect will inherit that image. 
        p Also note that each effect can apply multiple modifiers, so you probably only need a single effect. 
        p Once you've added an effect here, it will be listed on the "Effects" tab above, where you will also be able to edit the effect.
        button(on:click="{openActiveEffectEditor}") + Add Effect
            


</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
