<script>
  import Attribute from "~/components/Attribute.svelte";

  export let codes = [];

  console.log("codes", codes);
</script>

<div class="flexrow attribute-block">
  <div class="flexcol">
    <div class="flexrow header">
      <div class="title">&nbsp;</div>
      <div class="base">Base</div>
      <div class="current">Current</div>
      <div class="xp">XP</div>
    </div>

    {#each codes as code, i}
      <Attribute {code} />
    {/each}
  </div>
</div>

<style lang="scss" scoped>
  .attribute-block {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin: 0 0.3rem 0.3rem 0.3rem;
    padding: 0.6rem 0.2rem 0.2rem 0.2rem;
    text-transform: uppercase;
    font-family: "Signika";
  }
</style>
