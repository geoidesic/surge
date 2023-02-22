<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import DocumentCheckboxInput from "~/components/elements/DocumentCheckboxInput.svelte";
  import DocumentSelect from "~/components/elements/DocumentSelect.svelte";
  import DocumentTextInput from "~/components/elements/DocumentTextInput.svelte";
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import { TJSInput } from "@typhonjs-fvtt/svelte-standard/component";
  import { getContext } from "svelte";
  import {
    AOEshapes,
    manaTypes,
    timeUnits,
    effectTypes,
    targets,
    durationTypes,
    distanceUnits,
    damageTypes,
  } from "~/helpers/Constants.js";

  const doc = getContext("#doc");
  $: parentIsActor = $doc.parent?.constructor?.name == "Actor" ? true : false;
</script>

<template lang="pug">
  ScrollingContainer  
    .px-xs
      .flexcol
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
          h2.mt-none Detail
          .flexrow
            .labels.flexcol.left
              div
                label XP Cost (for level 0)
              div
                label Code
              +if("parentIsActor")
                label XP
              +if("parentIsActor")
                label Level
              div 
                label AP cost
              

            .values.flexcol.left.form-group-stacked
                div
                  DocInput(attr="system.xpOffset" inputType="number")
                div
                  DocInput(attr="system.code")
                +if("parentIsActor")
                  div
                    DocInput(attr="system.xpAssigned")
                +if("parentIsActor")
                  div
                    DocInput(attr="system.level")
                div
                  DocInput(attr="system.APcost")
                

      .flexcol
        .envelope
          h2.mt-none Casting
          
          .flexrow.left.mt-xs
            label.flex1 Action Point Cost (AP)
            DocInput(attr="system.APcost")

          .flexrow.left.mt-xs
            label.flex1 Rarity
            DocumentRaritySelect(bind:value='{$doc.system.rarity}')
          .flexrow.left.mt-xs
            label.flex1 Mana Type
            DocumentSelect(bind:value="{$doc.system.manaType}" options="{manaTypes}")

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
              DocumentTextInput(type="number" step="any" name="system.range.PB" placeholder="Point Blank" data-tooltip="DND5E.RangePointBlank" aria-describedby="tooltip" bind:value="{$doc.system.range.PB}")
              span.flex0 /
              DocumentTextInput(type='number' step='any' name='system.range.RF' placeholder='Range Factor' data-tooltip='DND5E.RangeFactor' aria-describedby='tooltip' bind:value="{$doc.system.range.RF}")
              span.flex0 /
              DocumentTextInput(type='number' step='any' name='system.range.ER' placeholder='Effective Range' data-tooltip='DND5E.EffectiveRange' aria-describedby='tooltip' bind:value="{$doc.system.range.ER}")
              DocumentSelect(name='system.range.units' data-tooltip='DND5E.RangeUnits' aria-describedby='tooltip' bind:value="{$doc.system.range.units}")
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
              DocumentTextInput(type='number' step='any' name='system.uses.value' data-tooltip='DND5E.UsesAvailable' bind:value="{$doc.system.uses.value}")
              span.flex0 of
              DocumentTextInput(type='number' name='system.uses.max' data-tooltip='DND5E.UsesMax' aria-describedby='tooltip' bind:value="{$doc.system.uses.max}")
              span.flex0 per
              DocumentSelect(name='system.uses.per' data-tooltip='DND5E.UsesPeriod' aria-describedby='tooltip' bind:value="{$doc.system.uses.per}")
                option(value selected)
                option(value='sr') Short Rest
                option(value='lr') Long Rest
                option(value='day') Day
                option(value='charges') Charges
      .px-xs
        .flexcol
          .envelope
            h2.mt-none Effects
            .flexrow.left.mt-xs
              label Damage Type
              DocumentSelect(name='system.uses.per' data-tooltip='DND5E.UsesPeriod' aria-describedby='tooltip' bind:value="{$doc.system.damageType}" options="{damageTypes}")
                
            .flexrow.left.mt-xs
              .labels.flexcol.left
                div
                  label Level
                div
                  label Effect Type
                div
                  label Effect Status
              .values.flexcol.left
                div
                  DocumentTextInput(type="number" step="any" name="system.level" placeholder="Point Blank" data-tooltip="DND5E.RangePointBlank" aria-describedby="tooltip" bind:value="{$doc.system.level}")
                div
                  select(options="{effectTypes}" value="{$doc.system.effectTypes}")
                div
                  select
              
            .form-group.stacked
              label.left Chat Flavour
              label 
                DocInput(style="width: 100%" attr="system.chatFlavour")
     
      .flexcol
        .envelope
          h2.mt-none Prerequisites
          .flexrow
            .labels.flexcol.left
              div
                label Prerequisites?
              +if("$doc.system.reqs.value")
                div
              div
                label Prerequisite Type
              +if("$doc.system.reqs.type === 'some'")
                label Prerequisites Minimum
              +if("$doc.system.reqs.value")
                label Prerequisites List
            .values.flexcol.left
              div
                DocumentCheckboxInput(class="cheeky" bind:value='{$doc.system.reqs.value}')
              +if("$doc.system.reqs.value")
                DocumentSelect(name='system.reqs.type' data-tooltip='DND5E.PrerequisitesType' aria-describedby='tooltip' bind:value="{$doc.system.reqs.type}")
                  option(value selected)
                  option(value='all') All
                  option(value='any') Any
                  option(value='some') At least
              +if("$doc.system.reqs.type === 'some'")
                DocumentTextInput(type="number" step="any" name="system.reqs.min" placeholder="Point Blank" data-tooltip="DND5E.MinimumPrerequisites" aria-describedby="tooltip" bind:value="{$doc.system.reqs.min}")
              +if("$doc.system.reqs.value")
                div no
        

</template>

<style lang="scss" scoped>
  .block {
    border: 10px solid #ff9900;
    border-radius: var(--border-radius);
    padding: 0 0.5rem 1rem 0.5rem;
    margin: 0.3rem 0;
    .label {
      vertical-align: -webkit-baseline-middle;
    }
  }
  input {
    margin: 0;
  }
  .flexrow,
  .flexcol {
    gap: 2px;
  }
  //- example of child selector
  .block :global(.cheeky) {
    margin: 0 0 0 -2px;
  }
  .form-group {
    clear: both;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 3px 0;
  }

  .form-group.stacked label.checkbox,
  .form-group.stacked label.radio {
    flex: auto;
    text-align: left;
  }
  .form-group-stacked > *,
  .form-group.stacked > * {
    flex: 100%;
  }
  .form-group .form-fields {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .envelope {
    margin: 0.4em 0;
    padding: 1em;
    border: 0.4em solid transparent;
    background: linear-gradient(white, white) padding-box,
      repeating-linear-gradient(-45deg, #6b1818 0, #112768 15%, #848a0e 0, #4e0a30 20%) 0 / 4em 4em;
    animation: shimmer 4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 0.5em 1em;
    }
    100% {
      background-position: 0 0;
    }
  }

  $lightblue: #7eb4e2;
  $darkblue: #32557f;

  .serrated {
    padding: 10px 10px;
    border: 10px solid transparent;
    border-width: 10px 0;
    background-color: $lightblue;
    background-color: hsla(0, 0%, 0%, 0);
    background-image: linear-gradient($lightblue, $darkblue),
      linear-gradient(to bottom right, transparent 50.5%, $lightblue 50.5%),
      linear-gradient(to bottom left, transparent 50.5%, $lightblue 50.5%),
      linear-gradient(to top right, transparent 50.5%, $darkblue 50.5%),
      linear-gradient(to top left, transparent 50.5%, $darkblue 50.5%);
    background-repeat: repeat, repeat-x, repeat-x, repeat-x, repeat-x;
    background-position: 0 0, 10px 0, 10px 0, 10px 100%, 10px 100%;
    background-size: auto auto, 20px 20px, 20px 20px, 20px 20px, 20px 20px;
    background-clip: padding-box, border-box, border-box, border-box, border-box;
    background-origin: padding-box, border-box, border-box, border-box, border-box;
  }
</style>
