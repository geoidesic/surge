<script>
  export let chatTemplate = "";
  import { onMount } from "svelte";
  console.log("SurgeRoll template: " + chatTemplate);
  let Template;

  onMount(async () => {
    Template = (await import(`./${chatTemplate}.svelte`)).default;
  });
</script>

<svelte:component this={Template} {...$$props} />
