<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let Actor = void 0;
  export let roll = void 0;
  export let code = void 0;
  // console.log("AttributeRollChat");
  // console.log(Actor);
  // console.log(Roll);
  // console.log(Roll.result);
  $: STR = Actor.system[code];
</script>

<template lang="pug">
  .flexrow
    .flex1
      img(src="{Actor.img}")
    .flex3
      h1 {Actor.name}
      p Rolled {code}
  .roll-container
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
    background-color: red;
    padding: 0.5rem;
    font-size: 2rem;
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
