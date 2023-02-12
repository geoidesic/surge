<script>
  import { getContext } from "svelte";
  import ExperiencePoints from "~/components/actor/ExperiencePoints.svelte";
  import DocInput from "~/components/actor/ActorInput.svelte";
  const doc = getContext("#doc");
</script>

<template lang="pug">
div.flex1.level-information
  table(style="text-align: right")
    tr
      th
        label Lvl
      td
        ExperiencePoints(className="level")  
    tr
      th
        caption unspent
      td
        DocInput(className="md right transparent" attr="system.unspentXP" maxlength="6")
    tr
      th
        caption spent
      td
        ExperiencePoints(className="spent")
</template>

<style lang="scss" scoped>
  caption {
    font-size: 0.6rem;
  }
  // @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap");
  .level-information {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    // border: 1px solid var(--border-color);
    // border-radius: var(--border-radius);
    // margin-left: 1rem;
    // padding: 1rem;
  }
</style>
