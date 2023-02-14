<script>
  export let chatTemplate = "";
  import { onMount } from "svelte";
  console.log("SurgeRoll template: " + chatTemplate);
  let Template;

  onMount(async () => {
    import(`./${chatTemplate}.svelte`).then((module) => {
      Template = module.default;
    });
  });
</script>

<svelte:component this={Template} {...$$props} />
