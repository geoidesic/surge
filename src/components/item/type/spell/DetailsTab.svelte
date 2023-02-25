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
  import {
    AOEshapes,
    manaTypes,
    timeUnits,
    targets,
    durationTypes,
    distanceUnits,
    damageTypes,
    magicSchools,
    actionTypes,
  } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer  
    .px-xs
      .flexcol.tab
        CommonDetails
              
        .envelope
          .flexrow

            .form-group.stacked
              h2 Spell Components
              label.checkbox
                DocumentCheckboxInput(name='system.components.vocal' bind:value="{$doc.system.components.vocal}") 
                | Verbal

              label.checkbox
                DocumentCheckboxInput(name='system.components.somatic' bind:value="{$doc.system.components.somatic}") 
                | Somatic

              label.checkbox
                DocumentCheckboxInput(name='system.components.material' bind:value="{$doc.system.components.material}") 
                | Material

              label.checkbox
                DocumentCheckboxInput(name='system.components.concentration' bind:value="{$doc.system.components.concentration}") 
                | Concentration

              label.checkbox
                DocumentCheckboxInput(name='system.components.ritual' bind:value="{$doc.system.components.ritual}") 
                | Ritual

              label.checkbox
                DocumentCheckboxInput(name='system.components.rune' bind:value="{$doc.system.components.rune}") 
                | Rune

          .flexrow.mt-md
            label.left Spellcasting Materials
            
          .flexrow
            DocInput( attr="system.Mcomponents" placeholder="@todo: link this to a compendium and make it a select. Add `consumed` checkbox. Make it auto-consume resource if present. And it should not allow casting unless material is present. ")
            label.flex0.mt-xs.ml-xs Consumed
            DocumentCheckboxInput(name='system.materials.consumed' bind:value="{$doc.system.materials.consumed}")   

        .envelope
          h2.mt-none Casting
          
          .flexrow.left.mt-xs
            label.flex1 Action Point Cost (AP)
            DocInput(attr="system.APcost")

          .flexrow.left.mt-xs
            label.flex1 Mana Type
            DocumentSelect(bind:value="{$doc.system.manaType}" options="{manaTypes}")

          .flexrow.left.mt-xs
            label.flex1 Mana Type
            DocumentSelect(bind:value="{$doc.system.actionType}" options="{actionTypes}")

          .flexrow.left.mt-xs
            label.flex1 Duration
            .form-fields.flexrow
              DocumentTextInput.flex1(type="number" name="system.duration.value" step='any' placeholder='—' bind:value="{$doc.system.duration.value}" data-tooltip="SURGE.DurationValue" aria-describedby="tooltip")
              DocumentSelect(name='system.duration.units' data-tooltip='SURGE.DurationUnits' aria-describedby='tooltip' bind:value="{$doc.system.duration.units}" options="{durationTypes}")
             
          .flexrow.left.mt-xs
            label.flex1 Target
            .form-fields.flex3.flexrow
              DocumentTextInput.flex0(type='number' step='any' name='system.target.value'  placeholder='—' bind:value="{$doc.system.target.value}")
              DocumentSelect(name='system.target.units' data-tooltip='SURGE.TargetUnits' aria-describedby='tooltip' bind:value="{$doc.system.target.units}" options="{distanceUnits}")
              DocumentSelect(name='system.target.type' data-tooltip='SURGE.TargetType' aria-describedby='tooltip' bind:value="{$doc.system.target.type}")
                option(value) None
                optgroup(label='Individual')
                  option(value='self') Self
                  option(value='ally') Ally
                  option(value='enemy') Enemy
                  option(value='creature' selected) Creature
                  option(value='object') Object
                  option(value='space') Space
                optgroup(label='Area')
                  option(value='cone') Cone
                  option(value='cube') Cube
                  option(value='cylinder') Cylinder
                  option(value='line') Line
                  option(value='radius') Radius
                  option(value='sphere') Sphere
                  option(value='square') Square
                  option(value='wall') Wall
          .flexrow.left.mt-xs
            label.flex1 Range
            .form-fields.flex3.flexrow
              DocumentTextInput(type="number" step="any" name="system.range.PB" placeholder="Point Blank" data-tooltip="SURGE.RangePointBlank" aria-describedby="tooltip" bind:value="{$doc.system.range.PB}")
              span.flex0 /
              DocumentTextInput(type='number' step='any' name='system.range.RF' placeholder='Range Factor' data-tooltip='SURGE.RangeFactor' aria-describedby='tooltip' bind:value="{$doc.system.range.RF}")
              span.flex0 /
              DocumentTextInput(type='number' step='any' name='system.range.ER' placeholder='Effective Range' data-tooltip='SURGE.EffectiveRange' aria-describedby='tooltip' bind:value="{$doc.system.range.ER}")
              DocumentSelect(name='system.range.units' data-tooltip='SURGE.RangeUnits' aria-describedby='tooltip' bind:value="{$doc.system.range.units}")
                option(value) None
                option(value='ft' selected) Feet
                option(value='mi') Miles
                option(value='m') Meters
                option(value='km') Kilometers
                option(value='self') Self
                option(value='touch') Touch
                option(value='spec') Special
                option(value='any') Any
          .flexrow.left.mt-xs
            label Limited Uses
            .form-fields.flex3.flexrow
              DocumentTextInput(type='number' step='any' name='system.uses.value' data-tooltip='SURGE.UsesAvailable' bind:value="{$doc.system.uses.value}")
              span.flex0 of
              DocumentTextInput(type='number' name='system.uses.max' data-tooltip='SURGE.UsesMax' aria-describedby='tooltip' bind:value="{$doc.system.uses.max}")
              span.flex0 per
              DocumentSelect(name='system.uses.per' data-tooltip='SURGE.UsesPeriod' aria-describedby='tooltip' bind:value="{$doc.system.uses.per}")
                option(value selected)
                option(value='sr') Short Rest
                option(value='lr') Long Rest
                option(value='day') Day
                option(value='charges') Charges
        .envelope
          h2.mt-none Effects
          .flexrow.left.mt-xs
            label Damage Type
            DocumentSelect(name='system.uses.per' data-tooltip='SURGE.DamageType' aria-describedby='tooltip' bind:value="{$doc.system.damageType}" options="{damageTypes}")
              
          .form-group.stacked
            label.left Chat Flavour
            label 
              DocInput(style="width: 100%" attr="system.chatFlavour")
     
        CommonPrerequisites
        

</template>

<style lang="scss" scoped>
  @import "../../../../styles/Mixins.scss";
  .tab {
    @include itemSheetDetailTab;
  }
</style>
