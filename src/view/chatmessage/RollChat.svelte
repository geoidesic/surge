<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let Actor = void 0;
  export let roll = void 0;
  export let code = void 0;
  export let noOfDice = void 0;
  export let die = void 0;
  export let className = void 0;

  import { attributes } from "~/helpers/Constants.js";

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
        caption Rolled: {code.toUpperCase()}
        caption.flex1
          .flexrow
            div.right.mr-sm Lvl.
            .lozenge.flex0.left(class="{className}") {ATT.level}
        caption {noOfDice}d{die}
  .roll-container(class="{className}")
    .emboss.flexrow
      .flex2
        .flexrow
          .code-container {code.toUpperCase()}
          .sub {className}
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
    .sub {
      font-size: 0.7rem;
    }
  }
  .roll-container,
  .lozenge {
    &.STR {
      background-color: var(--str-color-lighter);
    }
    &.DEX {
      background-color: var(--dex-color-lighter);
    }
    &.CHA {
      background-color: var(--cha-color-lighter);
    }
    &.INT {
      background-color: var(--int-color-lighter);
    }
    &.HLT {
      background-color: var(--hlt-color-lighter);
    }
    &.PER {
      background-color: var(--per-color-lighter);
    }
  }
  .lozenge {
    margin-top: -4px;
    padding: 0.1rem 0.2rem;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: white;
  }
  .emboss {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    -webkit-box-shadow: inset 5px -6px 50px -13px rgba(2, 0, 25, 0.73);
    box-shadow: inset 5px -6px 50px -13px rgba(2, 0, 25, 0.73);
  }
</style>
