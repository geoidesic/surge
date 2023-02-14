<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let Actor = void 0;
  export let roll = void 0;
  export let code = void 0;
  export let noOfDice = void 0;
  export let die = void 0;
  // console.log("AttributeRollChat");
  // console.log(Actor);
  // console.log(Roll);
  // console.log(Roll.result);
  $: ATT = Actor.system[code];
</script>

<template lang="pug">
  .flexrow
    .flex1
      img(src="{Actor.img}")
    .flex3
      h1 {Actor.name}
      .flexrow
        caption Rolled: {code}
        caption.flex0 ({ATT})
        caption {noOfDice}d{die}
  .roll-container(class="{code}")
    .emboss.flexrow
      .flex1.code-container {code}
      .flex3.right.roll-result {roll}

</template>

<style lang="scss" scoped>
  img {
    border: 5px solid var(--actor-profile-border-color);
    border-radius: 100%;
  }
  .roll-container {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 2rem;
    &.STR {
      background-color: var(--str-color);
    }
    &.DEX {
      background-color: var(--dex-color);
    }
    &.CHA {
      background-color: var(--cha-color);
    }
    &.INT {
      background-color: var(--int-color);
    }
    &.HLT {
      background-color: var(--hlt-color);
    }
    &.PER {
      background-color: var(--per-color);
    }
  }
  .emboss {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    -webkit-box-shadow: inset 5px -6px 50px -13px rgba(2, 0, 25, 0.73);
    box-shadow: inset 5px -6px 50px -13px rgba(2, 0, 25, 0.73);
  }
  .roll-result {
  }
</style>
