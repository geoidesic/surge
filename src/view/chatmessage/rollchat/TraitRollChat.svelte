<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let img = void 0;
  export let name = void 0;
  export let doc = void 0;
  export let roll = void 0;
  export let code = void 0;
  export let noOfDice = void 0;
  export let die = void 0;
  export let className = void 0;
  export let Item = void 0;
  export let Actor = void 0;
</script>

<template lang="pug">
  .flexrow
    .flex1
      img.profile(src="{Actor.img}")
    .flex3
      h1 {Actor.name}
      .flexcol
        .flexrow
          .flexrow.lozenge 
            img.flex0.item.mr-xs(src="{Item.img}")
            div.flex3.mt-xxs {Item.name} 
            .right.mt-xxs d{die}
  .roll-container
    .emboss.flexrow
      .flex2
        .flexrow
          .code-container Trait
      .flex3.right.roll-result {roll}
</template>

<style lang="scss" scoped>
  img {
    &.profile {
      border: 5px solid var(--actor-profile-border-color);
      border-radius: 100%;
    }
    &.item {
      width: 20px;
    }
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
    background-color: var(--weapon-color);
    margin-top: -4px;
    padding: 0.1rem 0.2rem;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: white;
    background: var(--trait-color);
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
