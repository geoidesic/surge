<script>
  import { getContext, onMount } from "svelte";
  import { validateNumericInput } from "~/helpers/Utility.js";
  import DocInput from "~/components/actor/ActorInput.svelte";
  import XPcalc from "~/components/actor/XPcalc.js";

  export let code = "";

  //- this defines the general cost of attributes. We can experiment by making them more or less costly.
  const attributeOffset = 0;

  const doc = getContext("#doc");
  let key = "";
  let prevValue;

  $: xpUnspent = parseInt($doc.system.xpUnspent) || 0;

  const templates = getContext("#templates");
  const XP = new XPcalc($doc);

  // console.log("code", code);
  // console.log(doc);
  // console.log($doc.system?.[code]);

  function updateCurrent(event) {
    console.log(event);
    if ($doc) {
      $doc.update({ [`system.${code}.currentevent`]: event.target.value });
    }
  }
  function updateBase(event) {
    console.log(event);
    if ($doc) {
      $doc.update({ [`system.${code}.level`]: event.target.value });
    }
  }

  /**
   * event.target.value contains the previous value before update
   */
  function validate(event) {
    console.log("function: validate");
    console.log(" event.target.value: ", event.target.value);

    //- store some reference values for the updateXP callback
    key = validateNumericInput(event, xpUnspent);
    prevValue = parseInt(event.target.value);

    if (key == false) return;

    const value = parseInt(event.target.value);
    if (key == "up" && xpUnspent <= 0) {
      console.log("validate failed because no unspentXP");
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function updateLevel(value) {
    //- if the total XP assigned including this value equals the next level cost, then increase the level to next level
    //- if it falls below, recuce the level

    const currentAttributeLevel = $doc.system[code].level;
    const nextLevelCost = XP.levelCost(currentAttributeLevel + 1, attributeOffset);
    const currentLevelCost = XP.levelCost(currentAttributeLevel, attributeOffset);

    if (value >= nextLevelCost) {
      $doc.update({ [`system.${code}.level`]: currentAttributeLevel + 1 });
    }
    if (value < currentLevelCost) {
      $doc.update({ [`system.${code}.level`]: currentAttributeLevel - 1 });
    }
  }

  /**
   * event.target.value contains the new value after update
   */
  function updateXP(event) {
    if (!$doc) {
      console.warn("Cannot proceed without Actor");
      return;
    }
    //- if the value has been deleted completely, then set it to zero
    if (event.target.value === "") {
      event.target.value = 0;
      $doc.update({ [`system.xpUnspent`]: unspentXp - prevValue });
      $doc.update({ [`system.${code}.xp`]: parseInt(event.target.value) });
    }

    //- if there was a keypress that failed validation return
    if (key === false) {
      console.log("keydown validation failed: do not update");
      return;
    }

    if (!typeof $doc.system[code].level == "number") {
      console.log("Invalid level");
      $doc.system[code].level = 0;
    }

    let value = parseInt(event.target.value);

    let dir = key == "up" || key == "down" ? key : XP.directionOfChange(value, code);
    let diff = prevValue - value;
    if (diff < 0 && xpUnspent + diff < 0) {
      console.log("Update would result in negative unspent XP, revert value to min");
      diff = -xpUnspent;
      value = prevValue + xpUnspent;
    }
    $doc.update({ [`system.xpUnspent`]: xpUnspent + diff });
    $doc.update({ [`system.${code}.xp`]: value });

    updateLevel(value);
  }
</script>

<template lang="pug">
  .flexrow.attribute-row(style="max-height: 1.4rem" class="{$doc.system[code].group} {code}" )
    i.fas.fa-dice.flex0
    h2 {code}
    //- input.base(type="number" value="{$doc.system[code].level}" on:keydown="{validate}" on:keyup="{updateBase}" disabled)
    .attribute {$doc.system[code].level}
    input.current(type="number" value="{$doc.system[code].level}" on:keydown="{validate}" on:keyup="{updateCurrent}" disabled)
    input.xp(type="number" value="{$doc.system[code].xp}" on:keydown="{validate}" on:keyup="{updateXP}")
</template>

<style lang="scss" scoped>
  .attribute-row {
    padding: 0px 8px;
  }
  .attribute {
    // border: 1px solid grey;
    background: rgba(255, 255, 255, 0.2);
    color: black;
    border-radius: var(--input-border-radius);
    padding: 3px 0 0 0;

    line-height: 1rem;
    max-height: 1.3rem;
  }
  h2 {
    border: none;
    text-align: right;
    margin-right: 0.3rem;
    font-size: 1rem;
  }
  input {
    padding: 0;
    margin: 0 1px;
    height: var(--attribute-field-height);
  }
</style>
