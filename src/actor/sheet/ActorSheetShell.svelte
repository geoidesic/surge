<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext } from "svelte";
  import DocInput from "~/components/DocInput.svelte";

  export let elementRoot;
  export let storeDoc;
  export let document;

  setContext("#doc", storeDoc);

  console.log(game);
  console.log(storeDoc);
  console.log(document);
</script>

<ApplicationShell bind:elementRoot>
  <p>{$storeDoc.name}</p>
  <DocInput attr={"name"} />
</ApplicationShell>
