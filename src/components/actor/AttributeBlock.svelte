<script>
  import Attribute from "~/components/actor/Attribute.svelte";

  export let codes = [];
</script>

<template lang="pug">
  .flexrow.attribute-block
    .flexcol
      .flexrow.header
        .title.flex1.mr-md
        .base Lvl
        .current Mod
        .xp XP
      
      +each("codes as code")
        Attribute({code})       

</template>

<style lang="scss" scoped>
  .attribute-block {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin: 0 0.3rem 0.3rem 0.3rem;
    padding: 0.6rem 0.2rem 0.2rem 0.2rem;
    text-transform: uppercase;
    font-family: "Signika";
    font-size: 0.8rem;
  }
</style>
