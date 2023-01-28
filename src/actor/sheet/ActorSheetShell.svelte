<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext } from "svelte";
  import DocInput from "~/components/DocInput.svelte";

  export let elementRoot;
  export let documentStore;
  export let document;

  setContext("#doc", documentStore);

  console.log(game);
  console.log(documentStore);
  console.log(document);
</script>

<ApplicationShell bind:elementRoot>
  <p>{$documentStore.name}</p>
  <DocInput attr={"name"} />
  <input bind:value={$documentStore.system.description} on:change />
  <input bind:value={$documentStore.system.backstory} on:change />
</ApplicationShell>
