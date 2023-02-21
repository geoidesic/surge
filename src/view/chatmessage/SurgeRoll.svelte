<script>
  export let chatTemplate = "";
  import { onMount } from "svelte";
  console.log("SurgeRoll template: " + chatTemplate);
  let Template;

  //- @todo: this is cute but it only works on the dev server (as a side effect)
  //- We'll need to map out the imports manually (sigh)
  onMount(async () => {
    Template = (await import(`./${chatTemplate}.svelte`)).default;
  });
</script>

<svelte:component this={Template} {...$$props} />
